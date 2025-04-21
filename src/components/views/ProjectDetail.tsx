
import { useParams, useNavigate } from "react-router-dom";
import { projectList } from "./Explore";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ExternalLink, Twitter } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { saveProject, getProjects } from "@/utils/localStorage";

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
  
  const addToMyProjects = () => {
    const projectToSave = {
      id: project.id,
      name: project.name,
      logo: project.logo,
      joined: true,
      completed: false,
      createdAt: Date.now()
    };
    
    saveProject(projectToSave);
    toast.success("Project added successfully", {
      description: `${project.name} has been added to your projects.`
    });
  };

  return (
    <div className="animate-fade-in pb-8">
      <Button
        onClick={() => navigate("/explore")}
        variant="ghost"
        className="mb-6 flex items-center"
      >
        <ArrowLeft size={18} className="mr-2" />
        Back
      </Button>

      <div className="rounded-2xl shadow-lg bg-white/90 border border-gray-100">
        {/* Hero Section */}
        <div className="p-8 text-center border-b border-gray-100 bg-gradient-to-br from-gray-50 to-white">
          <div className="w-24 h-24 mb-4 mx-auto rounded-full bg-gradient-to-br from-purple-500/5 to-blue-500/5 flex items-center justify-center overflow-hidden ring-4 ring-white">
            <img src={project.logo} alt={project.name} className="w-full h-full object-cover" />
          </div>
          <h2 className="text-2xl font-bold mb-2">{project.name}</h2>
          <Badge variant="secondary" className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 text-primary">
            {project.status}
          </Badge>
          <p className="text-sm text-gray-500 mt-4 max-w-md mx-auto">{project.description}</p>
          
          {/* Social Links */}
          <div className="flex justify-center gap-5 mt-6">
            <a
              href={project.social.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-primary transition-colors"
            >
              <ExternalLink size={18} />
              Website
            </a>
            <a
              href={project.social.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-primary transition-colors"
            >
              <Twitter size={18} />
              Twitter
            </a>
          </div>
        </div>

        {/* Project Details */}
        <div className="p-6">
          <div className="grid grid-cols-2 gap-4 mb-6">
            {/* TGE Info */}
            <div className="bg-gradient-to-br from-purple-500/5 to-blue-500/5 p-4 rounded-xl">
              <span className="block font-medium text-gray-700 mb-1">TGE</span>
              <span className="text-lg text-primary">{project.tge}</span>
            </div>
            
            {/* Funding Info */}
            <div className="bg-gradient-to-br from-green-500/5 to-teal-500/5 p-4 rounded-xl">
              <span className="block font-medium text-gray-700 mb-1">Funding</span>
              <span className="text-lg text-primary">{project.funding}</span>
            </div>
            
            {/* Reward Info */}
            <div className="bg-gradient-to-br from-orange-500/5 to-yellow-500/5 p-4 rounded-xl">
              <span className="block font-medium text-gray-700 mb-1">Reward</span>
              <span className="text-lg text-primary">{project.reward}</span>
            </div>
            
            {/* Type Info */}
            <div className="bg-gradient-to-br from-pink-500/5 to-rose-500/5 p-4 rounded-xl">
              <span className="block font-medium text-gray-700 mb-1">Type</span>
              <span className="text-lg text-primary">{project.type}</span>
            </div>
          </div>

          {/* Extended Project Description */}
          <div className="mb-8 bg-gray-50 p-4 rounded-xl">
            <h3 className="font-medium text-gray-700 mb-2">About {project.name}</h3>
            <p className="text-sm text-gray-600">
              {project.description} Learn more about how {project.name} is revolutionizing the blockchain ecosystem with its innovative approach to scaling and security.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 px-4">
            <Button 
              variant="secondary" 
              className="w-full"
              onClick={addToMyProjects}
            >
              Add to My Projects
            </Button>
            <a
              href={project.social.website}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <Button variant="outline" className="w-full">
                Join Project <ExternalLink size={16} className="ml-2" />
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
