
import { useNavigate } from "react-router-dom";

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
    social: {
      website: "https://blast.io",
      twitter: "https://twitter.com/Blast_L2"
    }
  },
  // Add more projects here as needed
];

const Explore = () => {
  const navigate = useNavigate();
  return (
    <div className="pt-3">
      <h2 className="text-xl font-bold mb-4 text-center">Explore Projects</h2>
      <div className="grid gap-4">
        {projectList.map((p) => (
          <button
            key={p.id}
            onClick={() => navigate(`/explore/${p.id}`)}
            className="rounded-2xl bg-white shadow-sm border border-gray-100 p-5 flex flex-col items-center relative overflow-hidden transition hover:scale-[1.03]"
            aria-label={p.name}
          >
            <div className="w-20 h-20 bg-gray-100 rounded-full mb-2 flex items-center justify-center overflow-hidden">
              <img src={p.logo} alt={p.name} className="w-full h-full object-cover" />
            </div>
            <div className="font-semibold text-gray-800">{p.name}</div>
            <div className="text-xs text-gray-500 mt-1 text-center">{p.description}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Explore;
