import { VideoAnalyzer } from "@/components/VideoAnalyzer";

export default function VideoAnalysisPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-white">Real-time Video Lab</h1>
                <p className="text-muted-foreground">
                    Frame-by-frame deepfake detection with temporal consistency analysis.
                </p>
            </div>

            <VideoAnalyzer />
        </div>
    );
}
