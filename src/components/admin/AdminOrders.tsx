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
    FileText,
    Tag,
    Link as LinkIcon,
    ExternalLink,
    Loader2,
} from "lucide-react";
import { Order } from "@/types/admin";

interface AdminOrdersProps {
    orders: Order[];
    updateOrderStatus: (orderId: string, newStatus: string) => Promise<void>;
    loading?: boolean;
}

const orderStatuses = [
    { value: "pending", label: "Pending" },
    { value: "in_progress", label: "In Progress" },
    { value: "submitted", label: "Submitted to Play Store" },
    { value: "published", label: "Published" },
    { value: "rejected", label: "Rejected" },
    { value: "completed", label: "Completed" },
];

const addOnLabels: Record<string, string> = {
    "feature-graphic": "Feature Graphic Design",
    "copywriting": "Store Listing Copywriting",
    "expedited": "Expedited Delivery",
    "screenshots": "Screenshot Enhancement",
    "source-code": "Source Code",
};

export function AdminOrders({ orders, updateOrderStatus, loading }: AdminOrdersProps) {
    const [expandedOrders, setExpandedOrders] = useState<Set<string>>(new Set());

    const toggleOrderExpand = (orderId: string) => {
        setExpandedOrders((prev) => {
            const next = new Set(prev);
            if (next.has(orderId)) {
                next.delete(orderId);
            } else {
                next.add(orderId);
            }
            return next;
        });
    };

    const getStatusBadge = (status: string) => {
        const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
            pending: "secondary",
            in_progress: "default",
            submitted: "default",
            published: "default",
            completed: "default",
            rejected: "destructive",
        };
        return <Badge variant={variants[status] || "secondary"}>{status.replace("_", " ")}</Badge>;
    };

    if (loading) {
        return (
            <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <Card className="glass-card">
                <CardContent className="py-12 text-center text-muted-foreground">
                    No orders yet
                </CardContent>
            </Card>
        );
    }

    return (
        <div className="space-y-4 animate-slide-up">
            {orders.map((order, index) => (
                <Card
                    key={order.id}
                    className="glass-card glass-card-hover overflow-hidden transition-all duration-300"
                    style={{ animationDelay: `${index * 50}ms` }}
                >
                    <CardContent className="p-0">
                        {/* Order Header */}
                        <div
                            className="p-4 md:p-6 cursor-pointer hover:bg-secondary/30 transition-colors"
                            onClick={() => toggleOrderExpand(order.id)}
                        >
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap mb-2">
                                        <h3 className="font-semibold text-lg truncate text-foreground">{order.app_name}</h3>
                                        {getStatusBadge(order.status)}
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-sm text-muted-foreground">
                                        <span className="flex items-center gap-2">
                                            <User className="h-3.5 w-3.5" />
                                            {order.customer_name}
                                        </span>
                                        <span className="flex items-center gap-2">
                                            <Mail className="h-3.5 w-3.5" />
                                            <span className="truncate">{order.email}</span>
                                        </span>
                                        <span className="flex items-center gap-2">
                                            <Calendar className="h-3.5 w-3.5" />
                                            {new Date(order.created_at).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between md:justify-end gap-4 border-t md:border-t-0 pt-4 md:pt-0 mt-2 md:mt-0 border-border/50">
                                    <div className="flex flex-col items-end">
                                        <span className="text-xs text-muted-foreground">Total Price</span>
                                        <span className="font-bold text-primary text-xl">${order.total_price}</span>
                                    </div>
                                    {expandedOrders.has(order.id) ? (
                                        <ChevronUp className="h-5 w-5 text-muted-foreground" />
                                    ) : (
                                        <ChevronDown className="h-5 w-5 text-muted-foreground" />
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Expanded Order Details */}
                        {expandedOrders.has(order.id) && (
                            <div className="border-t border-border/50 p-4 md:p-6 bg-secondary/10 space-y-6 animate-fade-in">
                                {/* Status Management */}
                                <div className="flex flex-col sm:flex-row sm:items-center gap-4 bg-background/40 p-4 rounded-lg border border-border/50">
                                    <span className="text-sm font-medium whitespace-nowrap">Update Status:</span>
                                    <Select
                                        value={order.status}
                                        onValueChange={(value) => updateOrderStatus(order.id, value)}
                                    >
                                        <SelectTrigger className="w-full sm:w-[240px] bg-background/60">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {orderStatuses.map((status) => (
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
                                            window.open(`mailto:${order.email}`, "_blank");
                                        }}
                                    >
                                        <Mail className="h-4 w-4 mr-2" />
                                        Email Customer
                                    </Button>
                                </div>

                                {/* App Details Grid */}
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                    <div className="space-y-4">
                                        <h4 className="font-semibold text-sm text-primary uppercase tracking-wide flex items-center gap-2">
                                            <FileText className="h-4 w-4" /> App Information
                                        </h4>

                                        <div className="space-y-4 bg-background/20 p-4 rounded-lg border border-border/30">
                                            <div>
                                                <span className="text-xs text-muted-foreground block mb-1">Short Description</span>
                                                <p className="text-sm leading-relaxed">{order.short_description}</p>
                                            </div>

                                            {order.full_description && (
                                                <div>
                                                    <span className="text-xs text-muted-foreground block mb-1">Full Description</span>
                                                    <p className="text-sm border-l-2 border-primary/20 pl-3 py-1 bg-background/30 rounded-r-md whitespace-pre-wrap">
                                                        {order.full_description}
                                                    </p>
                                                </div>
                                            )}

                                            {order.category && (
                                                <div>
                                                    <span className="text-xs text-muted-foreground flex items-center gap-1 mb-1">
                                                        <Tag className="h-3 w-3" /> Category
                                                    </span>
                                                    <Badge variant="outline" className="capitalize">{order.category}</Badge>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <h4 className="font-semibold text-sm text-primary uppercase tracking-wide flex items-center gap-2">
                                            <LinkIcon className="h-4 w-4" /> Links & Add-ons
                                        </h4>

                                        <div className="space-y-4 bg-background/20 p-4 rounded-lg border border-border/30 h-full">
                                            <div className="space-y-3">
                                                {order.privacy_policy_url && (
                                                    <div className="flex flex-col">
                                                        <span className="text-xs text-muted-foreground mb-1">Privacy Policy</span>
                                                        <a
                                                            href={order.privacy_policy_url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-sm text-primary hover:underline hover:text-primary/80 flex items-center gap-1 break-all transition-colors"
                                                        >
                                                            <ExternalLink className="h-3 w-3 flex-shrink-0" />
                                                            {order.privacy_policy_url}
                                                        </a>
                                                    </div>
                                                )}

                                                {order.support_url && (
                                                    <div className="flex flex-col">
                                                        <span className="text-xs text-muted-foreground mb-1">Support URL</span>
                                                        <a
                                                            href={order.support_url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-sm text-primary hover:underline hover:text-primary/80 flex items-center gap-1 break-all transition-colors"
                                                        >
                                                            <ExternalLink className="h-3 w-3 flex-shrink-0" />
                                                            {order.support_url}
                                                        </a>
                                                    </div>
                                                )}
                                            </div>

                                            {order.add_ons && order.add_ons.length > 0 && (
                                                <div className="pt-4 border-t border-border/30">
                                                    <span className="text-xs text-muted-foreground block mb-2">Add-ons Selected</span>
                                                    <div className="flex flex-wrap gap-2">
                                                        {order.add_ons.map((addon) => (
                                                            <Badge key={addon} variant="secondary" className="glass-card border-none">
                                                                {addOnLabels[addon] || addon}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Footer / Order ID */}
                                <div className="pt-4 border-t border-border/50 text-right">
                                    <span className="text-xs font-mono text-muted-foreground/60 select-all">Order ID: {order.id}</span>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
