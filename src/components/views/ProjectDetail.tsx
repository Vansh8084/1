
import { useParams, useNavigate } from "react-router-dom";
import { projectList } from "./Explore";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

// Add your logic for adding to favorites, my projects, etc., here
// For demo: uses only UI, you'll want to hook this up to localStorage/tasks logic
const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projectList.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="text-center py-16">
        <Button onClick={() => navigate("/explore")} variant="outline" className="mb-4">
          <ArrowLeft size={18} className="mr-2" />
          Back to Explore
        </Button>
        <div className="text-gray-500">Project not found.</div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in pb-8">
      <Button
        onClick={() => navigate("/explore")}
        variant="ghost"
        className="mb-4 flex items-center"
      >
        <ArrowLeft size={18} className="mr-2" />
        Back
      </Button>

      <div className="rounded-2xl shadow-lg bg-white/90 border border-gray-100 p-6 text-center">
        <div className="w-24 h-24 mb-3 mx-auto rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
          <img src={project.logo} alt={project.name} className="w-full h-full object-cover" />
        </div>
        <h2 className="text-2xl font-bold mb-2">{project.name}</h2>
        <div className="text-sm text-gray-500 mb-3">{project.description}</div>

        <div className="grid grid-cols-2 gap-3 text-left mb-4">
          <div>
            <span className="block font-medium text-gray-700">TGE</span>
            <span className="block text-gray-600">{project.tge}</span>
          </div>
          <div>
            <span className="block font-medium text-gray-700">Funding</span>
            <span className="block text-gray-600">{project.funding}</span>
          </div>
          <div>
            <span className="block font-medium text-gray-700">Reward</span>
            <span className="block text-gray-600">{project.reward}</span>
          </div>
          <div>
            <span className="block font-medium text-gray-700">Type</span>
            <span className="block text-gray-600">{project.type}</span>
          </div>
        </div>
        <div className="flex justify-center gap-4 mb-5">
          <a
            href={project.social.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline text-sm"
          >
            Website
          </a>
          <a
            href={project.social.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline text-sm"
          >
            Twitter
          </a>
        </div>
        <div className="flex flex-col gap-2">
          <Button variant="secondary">Add to Favorite</Button>
          <Button variant="default">Add to My Projects</Button>
          <a
            href={project.social.website}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <Button variant="outline" className="w-full">
              Join
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
