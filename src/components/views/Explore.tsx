
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Compass, ArrowUpRight, ExternalLink, Calendar, Twitter } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { saveProject, getProjects } from "@/utils/localStorage";

// PROJECTS DATA: EDIT THIS ARRAY TO ADD/REMOVE PROJECTS
export const projectList = [
  {
    id: "starknet",
    name: "StarkNet",
    logo: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=120",
    description: "A Layer 2 scaling solution for Ethereum using ZK-Rollups.",
    tge: "Q3 2024",
    funding: "$250M",
    reward: "Tokens",
    type: "ZK-Rollup",
    status: "Upcoming", // Add status for each project
    social: {
      website: "https://starknet.io",
      twitter: "https://twitter.com/Starknet"
    }
  },
  {
    id: "blast",
    name: "Blast",
    logo: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=120",
    description: "Ethereum L2 platform with native yield on ETH.",
    tge: "Q4 2024",
    funding: "$150M",
    reward: "Airdrop",
    type: "Optimistic Rollup",
    status: "Active",
    social: {
      website: "https://blast.io",
      twitter: "https://twitter.com/Blast_L2"
    }
  },
];

const Explore = () => {
  const navigate = useNavigate();
  
  const addToMyProjects = (e, project) => {
    e.stopPropagation();
    
    const projectToSave = {
      id: project.id,
      name: project.name,
      logo: project.logo,
      joined: true,
      completed: false,
      createdAt: Date.now()
    };
    
    saveProject(projectToSave);
    toast.success("Project added to your projects", {
      description: `${project.name} has been added to your projects.`
    });
  };
  
  return (
    <div className="pt-3">
      <h2 className="text-xl font-bold mb-6 text-center">
        <Compass className="inline-block mr-2" /> Explore Projects
      </h2>
      <div className="grid gap-6">
        {projectList.map((p) => (
          <button
            key={p.id}
            onClick={() => navigate(`/explore/${p.id}`)}
            className="group rounded-2xl bg-white shadow-md border border-gray-100 p-6 flex items-start relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.01] animate-fade-in text-left"
          >
            {/* Project Status Badge */}
            <Badge 
              variant="secondary" 
              className="absolute top-4 right-4 bg-gradient-to-r from-purple-500/10 to-blue-500/10 text-primary"
            >
              {p.status}
            </Badge>

            {/* Logo */}
            <div className="w-20 h-20 bg-gradient-to-br from-gray-50 to-gray-100 rounded-full mb-4 flex-shrink-0 flex items-center justify-center overflow-hidden ring-2 ring-gray-50 mr-5">
              <img src={p.logo} alt={p.name} className="w-full h-full object-cover" />
            </div>

            {/* Project Info */}
            <div className="flex-1">
              <h3 className="font-semibold text-lg text-gray-800 mb-1 flex items-center gap-2">
                {p.name}
                <ArrowUpRight className="w-4 h-4 opacity-0 -translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0" />
              </h3>
              <p className="text-sm text-gray-500 mb-3">{p.description}</p>

              {/* Quick Info */}
              <div className="flex items-center text-xs text-gray-400 mb-2">
                <span className="flex items-center gap-1 mr-4">
                  <Calendar className="w-3 h-3" />
                  {p.tge}
                </span>
                <span className="mr-4">{p.type}</span>
                <span>{p.reward}</span>
              </div>
              
              {/* Social Links & Action */}
              <div className="flex justify-between items-center mt-3">
                <div className="flex items-center gap-3">
                  <a
                    href={p.social.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-gray-400 hover:text-primary transition-colors"
                  >
                    <ExternalLink size={14} />
                  </a>
                  <a
                    href={p.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-gray-400 hover:text-primary transition-colors"
                  >
                    <Twitter size={14} />
                  </a>
                </div>
                
                <button
                  onClick={(e) => addToMyProjects(e, p)}
                  className="text-xs text-gray-500 border border-gray-200 rounded-full px-3 py-1 hover:bg-gray-50"
                >
                  Add to My Projects
                </button>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Explore;
