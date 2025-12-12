import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    User,
    Mail,
    Calendar,
    ChevronUp,
    ChevronDown,
    Loader2,
    MessageSquare,
} from "lucide-react";
import { ContactMessage } from "@/types/admin";

interface AdminMessagesProps {
    messages: ContactMessage[];
    updateMessageStatus: (messageId: string, newStatus: string) => Promise<void>;
    loading?: boolean;
}

const messageStatuses = [
    { value: "unread", label: "Unread" },
    { value: "read", label: "Read" },
    { value: "replied", label: "Replied" },
];

export function AdminMessages({ messages, updateMessageStatus, loading }: AdminMessagesProps) {
    const [expandedMessages, setExpandedMessages] = useState<Set<string>>(new Set());

    const toggleMessageExpand = (messageId: string) => {
        setExpandedMessages((prev) => {
            const next = new Set(prev);
            if (next.has(messageId)) {
                next.delete(messageId);
            } else {
                next.add(messageId);
            }
            return next;
        });
    };

    const getStatusBadge = (status: string) => {
        const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
            unread: "destructive",
            read: "outline",
            replied: "default",
        };
        return <Badge variant={variants[status] || "secondary"}>{status}</Badge>;
    };

    if (loading) {
        return (
            <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (messages.length === 0) {
        return (
            <Card className="glass-card">
                <CardContent className="py-12 text-center text-muted-foreground">
                    No messages yet
                </CardContent>
            </Card>
        );
    }

    return (
        <div className="space-y-4 animate-slide-up">
            {messages.map((message, index) => (
                <Card
                    key={message.id}
                    className="glass-card glass-card-hover overflow-hidden transition-all duration-300"
                    style={{ animationDelay: `${index * 50}ms` }}
                >
                    <CardContent className="p-0">
                        {/* Message Header */}
                        <div
                            className="p-4 md:p-6 cursor-pointer hover:bg-secondary/30 transition-colors"
                            onClick={() => toggleMessageExpand(message.id)}
                        >
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap mb-2">
                                        <h3 className="font-semibold text-lg truncate text-foreground flex items-center gap-2">
                                            <span className="bg-primary/10 p-1 rounded">
                                                <MessageSquare className="h-4 w-4 text-primary" />
                                            </span>
                                            {message.subject}
                                        </h3>
                                        {getStatusBadge(message.status)}
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-sm text-muted-foreground">
                                        <span className="flex items-center gap-2">
                                            <User className="h-3.5 w-3.5" />
                                            {message.name}
                                        </span>
                                        <span className="flex items-center gap-2">
                                            <Mail className="h-3.5 w-3.5" />
                                            <span className="truncate">{message.email}</span>
                                        </span>
                                        <span className="flex items-center gap-2">
                                            <Calendar className="h-3.5 w-3.5" />
                                            {new Date(message.created_at).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-end gap-4 mt-2 md:mt-0">
                                    {expandedMessages.has(message.id) ? (
                                        <ChevronUp className="h-5 w-5 text-muted-foreground" />
                                    ) : (
                                        <ChevronDown className="h-5 w-5 text-muted-foreground" />
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Expanded Message Details */}
                        {expandedMessages.has(message.id) && (
                            <div className="border-t border-border/50 p-4 md:p-6 bg-secondary/10 space-y-4 animate-fade-in">
                                {/* Status Management */}
                                <div className="flex flex-col sm:flex-row sm:items-center gap-4 bg-background/40 p-4 rounded-lg border border-border/50">
                                    <span className="text-sm font-medium whitespace-nowrap">Update Status:</span>
                                    <Select
                                        value={message.status}
                                        onValueChange={(value) => updateMessageStatus(message.id, value)}
                                    >
                                        <SelectTrigger className="w-full sm:w-[200px] bg-background/60">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {messageStatuses.map((status) => (
                                                <SelectItem key={status.value} value={status.value}>
                                                    {status.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="sm:ml-auto w-full sm:w-auto"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            window.open(`mailto:${message.email}?subject=Re: ${message.subject}`, "_blank");
                                        }}
                                    >
                                        <Mail className="h-4 w-4 mr-2" />
                                        Reply via Email
                                    </Button>
                                </div>

                                {/* Message Content */}
                                <div>
                                    <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold ml-1">Message Content</span>
                                    <div className="mt-2 text-sm bg-background/50 p-6 rounded-xl border border-border/30 shadow-sm leading-relaxed whitespace-pre-wrap">
                                        {message.message}
                                    </div>
                                </div>

                                {/* Message ID */}
                                <div className="pt-4 border-t border-border/50 text-right">
                                    <span className="text-xs font-mono text-muted-foreground/60 select-all">Msg ID: {message.id}</span>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
