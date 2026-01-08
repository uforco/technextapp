"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Copy, Check, ExternalLink, Link2 } from "lucide-react";
import { useState } from "react";
import { UrlData } from "./dashboard";

interface UrlDetailProps {
  url: UrlData | null;
}

export function UrlDetail({ url }: UrlDetailProps) {
  const [copied, setCopied] = useState<"short" | "long" | null>(null);

  const handleCopy = async (text: string, type: "short" | "long") => {
    await navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  if (!url) {
    return (
      <Card className="h-fit">
        <CardHeader>
          <CardTitle>URL Details</CardTitle>
          <CardDescription>Select a URL to view details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
            <Link2 className="h-12 w-12 mb-4 opacity-50" />
            <p className="text-center">
              Click on a URL from the list to see its details here
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="flex items-center justify-between gap-2">
          <div>URL Details</div>
          <div>
            Total clicks/visits:
            <Badge variant="secondary" className="text-xs">
              {url.count}
            </Badge>
          </div>
        </CardTitle>
        <CardDescription>View and manage this shortened URL</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            Short URL
          </label>
          <div className="flex items-center gap-2">
            <div className="flex-1 p-3 rounded-md bg-muted text-sm font-mono break-all">
              {url.shorturl}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleCopy(url.shorturl, "short")}
            >
              {copied === "short" ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            Original URL
          </label>
          <div className="flex items-center gap-2">
            <div className="flex-1 p-3 rounded-md bg-muted text-sm break-all">
              {url.longurl}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleCopy(url.longurl, "long")}
            >
              {copied === "long" ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        <Button
          className="w-full"
          onClick={() => window.open(url.longurl, "_blank")}
        >
          <ExternalLink className="h-4 w-4 mr-2" />
          Visit Original URL
        </Button>
      </CardContent>
    </Card>
  );
}
