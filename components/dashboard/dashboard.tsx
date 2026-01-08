"use client";

import { useState } from "react";
import { Header } from "./header";
import { UrlForm } from "./url-form";
import { UrlList } from "./url-list";
import { UrlDetail } from "./url-detail";

export interface UrlData {
  id: string;
  shortUrl: string;
  longUrl: string;
}

export function Dashboard() {
  const [selectedUrl, setSelectedUrl] = useState<UrlData | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleUrlCreated = () => {
    setRefreshKey((prev) => prev + 1);
  };

  const handleUrlDeleted = () => {
    setSelectedUrl(null);
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            URL Shortener Dashboard
          </h1>
          <p className="text-muted-foreground">
            Create and manage your shortened URLs
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <UrlForm onUrlCreated={handleUrlCreated} />
            <UrlList
              key={refreshKey}
              onSelectUrl={setSelectedUrl}
              onUrlDeleted={handleUrlDeleted}
            />
          </div>
          <div className="lg:col-span-1">
            <UrlDetail url={selectedUrl} />
          </div>
        </div>
      </main>
    </div>
  );
}
