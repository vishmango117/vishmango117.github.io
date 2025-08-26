import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>About Me</CardTitle>
          <CardDescription>Building data products end-to-end</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="prose dark:prose-invert max-w-none">
            <p>
              I’m a software engineer focused on data platforms, analytics, and visualizations.
              I enjoy TypeScript, React, and creating reliable developer experiences.
            </p>
            <p>
              This site showcases selected projects and notes on engineering and data.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

