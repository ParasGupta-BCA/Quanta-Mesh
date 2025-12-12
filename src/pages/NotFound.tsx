import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { FileQuestion, Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="flex min-h-[80vh] flex-col items-center justify-center p-4 text-center">
        <div className="animate-fade-in space-y-8 max-w-md mx-auto">
          {/* Icon Container */}
          <div className="relative mx-auto h-32 w-32">
            <div className="absolute inset-0 animate-pulse rounded-full bg-primary/20 blur-2xl" />
            <div className="relative flex h-full w-full items-center justify-center rounded-full bg-secondary/30 backdrop-blur-sm border border-border/50 shadow-xl">
              <FileQuestion className="h-16 w-16 text-primary animate-bounce-slow" />
            </div>
          </div>

          {/* Text Content */}
          <div className="space-y-4">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl bg-clip-text text-transparent bg-gradient-to-br from-foreground to-muted-foreground/50">
              Page Not Found
            </h1>
            <p className="text-lg text-muted-foreground">
              We couldn't find the page you were looking for. It might have been removed, renamed, or doesn't exist.
            </p>
            <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm font-mono break-all">
              404: {location.pathname}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button asChild size="lg" className="w-full sm:w-auto gap-2 group">
              <Link to="/">
                <Home className="h-4 w-4" />
                Back to Home
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto gap-2"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="h-4 w-4" />
              Go Back
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
