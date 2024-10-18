import React from "react";
import { Card } from "@/components/ui/card";

export default function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <Card className="p-6 bg-card dark:border-slate-700 dark:border dark:shadow-lg dark:bg-gradient-to-br dark:from-slate-950 dark:via-slate-900 dark:via-50% dark:to-slate-950 dark:text-slate-100">
      <div className="text-3xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </Card>
  );
}