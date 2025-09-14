import React, { useState } from 'react';
import { Award, Trophy, Users, Camera, Play, ChevronRight, Star, Target, Gift, BookOpen, X } from 'lucide-react';
import CommunityRegistration from './CommunityRegistration';

interface Society {
  id: number;
  name: string;
  location: string;
  image: string;
  achievement: string;
  wasteReduction: number;
  participationRate: number;
  yearWon: number;
  description: string;
  photos: string[];
  videos: { title: string; thumbnail: string; duration: string }[];
  methods: string[];
  impact: {
    wasteProcessed: number;
    energySaved: number;
    carbonReduced: number;
    jobsCreated: number;
  };
  testimonials: { name: string; role: string; quote: string; avatar: string }[];
}

const Credits = () => {
  const [selectedSociety, setSelectedSociety] = useState<Society | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [showRegistration, setShowRegistration] = useState(false);

  const winningSocieties: Society[] = [
    {
      id: 1,
      name: "Pond Warriors Society",
      location: "Delhi, INDIA",
      image: "https://img-cdn.publive.online/fit-in/1280x960/filters:format(webp)/english-betterindia/media/post_attachments/uploads/2025/07/TBI-FEATURED-IMAGE-2025-07-30T154341.887-1753870434.jpg",
      achievement: "Society of the Year 2024",
      wasteReduction: 85,
      participationRate: 96,
      yearWon: 2024,
      description: "In Delhi-NCR’s urban sprawl, Ramveer Tanwar — a former engineer — has been reviving dying ponds through community-led efforts. His initiative, Jal Chaupal, has helped restore over 80 wetlands across India, improving groundwater, biodiversity, and local pride",
      photos: [
        "https://img-cdn.publive.online/filters:format(webp)/english-betterindia/media/post_attachments/uploads/2025/07/TBI-FEATURED-IMAGE-2025-07-30T154522.606-1753870703.jpg ",
        "https://imgs.search.brave.com/TSmqa20ZjD4e0w_iiVaAp4j2Wv4O65ffAnpL7bG22R0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuaW5kaWFuZXhw/cmVzcy5jb20vMjAx/OS8wNC9yYW1fcG9u/ZC1jbGVhbmluZy5q/cGc",
        "https://imgs.search.brave.com/Vp_SM3Mz0ZLynC_TaXR1z79j_lSNAobBKCYuxr75x3U/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/amFncmFuaW1hZ2Vz/LmNvbS9pbWFnZXMv/bmV3aW1nL2FydGlj/bGVpbWFnZXMvcmFt/dmVlciUyMHRhbndh/ci5qcGc",
        "https://imgs.search.brave.com/Bfda_7Rs0QdZZpvjS9KQLceGfYCFSGfc-Pg_eto3paQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9hbGMu/ZWR1LmluL3dwLWNv/bnRlbnQvdXBsb2Fk/cy8yMDIyLzEyL1Bv/bmQtTWFuLW9mLUlu/ZGlhLTEuanBn"
      ],
      videos: [
        { title: "Community Waste Sorting Workshop", thumbnail: "https://images.pexels.com/photos/3735709/pexels-photo-3735709.jpeg", duration: "5:32" },
        { title: "Monthly Collection Drive", thumbnail: "https://images.pexels.com/photos/3951628/pexels-photo-3951628.jpeg", duration: "3:45" },
        { title: "Resident Success Stories", thumbnail: "https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg", duration: "7:18" }
      ],
      methods: [
        "Door-to-door education campaigns",
        "Color-coded waste bins for each household",
        "Weekly community sorting workshops",
        "Digital tracking system for participation",
        "Reward points for consistent segregation",
        "Monthly community clean-up drives"
      ],
      impact: {
        wasteProcessed: 2400,
        energySaved: 1200,
        carbonReduced: 850,
        jobsCreated: 15
      },
      testimonials: [
        {
          name: "Aman Gupta",
          role: "Community Leader",
          quote: "The waste segregation program transformed our neighborhood. We went from chaos to a model community in just one year.",
          avatar: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg"
        },
        {
          name: "Anita Sharma",
          role: "Resident",
          quote: "My family earned over $200 in rewards last year just by properly sorting our waste. It's a win-win for everyone.",
          avatar: "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg"
        }
      ]
    },
    {
      id: 2,
      name: "Residant Warriors Society",
      location: "Malleshwaram Bengaluru, INDIA",
      image: "https://images.indianexpress.com/2023/08/cover.jpg?w=640",
      achievement: "Innovation Award 2024",
      wasteReduction: 78,
      participationRate: 92,
      yearWon: 2024,
      description: "While the Instagram world is brimming with reels related to fashion, travel, film numbers, and memes, 62-year-old Vani Murthy is riding the ‘reel wave’ by sharing her life experiences centred around composting and waste management. Murthy, who also goes by the name ‘Worm Rani’, is an Instagram sensation who gained popularity during the Covid-19 pandemic. With three lakh followers on Instagram, Worm Rani is all about advocating sustainability through simple lifestyle practices – right from using your own steel cups and plates to composting vegetable peels and producing organic matter.",
      photos: [
        "https://imgs.search.brave.com/5YuJZ3UwBvyG021zzSlJUUhFWJBkyxP4xq7Qfoqhr6Y/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdXN0/YWlubGlmeS5jb20v/d3AtY29udGVudC91/cGxvYWRzLzIwMjMv/MDEvdmFuaV9tdXJ0/aHlfMi5qcGc",
        "https://imgs.search.brave.com/uztJqZv9IOD4jPMPeG-JhNwMyv3m4XUIzZyzIEQiBlQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5hc3NldHR5cGUu/Y29tL1ROSUUvaW1w/b3J0LzIwMjIvNS8y/L29yaWdpbmFsL2lt/Z184NzA1MDczODA3/LmpwZz93PTQ4MCZh/dXRvPWZvcm1hdCxj/b21wcmVzcyZmaXQ9/bWF4",
        "https://imgs.search.brave.com/pE3yAWP5eWR0fJXn-vdKT2OQI7Js3vkNcxzYz8B7XUY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWdz/LnNlYXJjaC5icmF2/ZS5jb20vbDRSNnk3/QTN2YlVhM0lVZ3pZ/bWpCbXZoeV9BeEVt/SEUtTEx5Wk9PaklU/Zy9yczpmaXQ6NTAw/OjA6MDowL2c6Y2Uv/YUhSMGNITTZMeTlw/YldGbi9aWE11ZVc5/MWNuTjBiM0o1L0xt/TnZiUzlqY3k4MEx6/Y3kvTVdJeFl6RXdN/R1ZpT1RFeC9aV0k1/TXpaaE1URXhOR1Zo/L01EQmhOV013TDFa/aGJtbE4vZFhKMGFI/bGxZWEpzZVdSaC9l/WE10TVRZMU5Ua3dO/REl3L01ERXhOUzV3/Ym1jX1ptMDkvY0c1/bkptRjFkRzg5Wm05/eS9iV0Yw"
      ],
      videos: [
        { title: "Smart Bin Technology Demo", thumbnail: "https://images.pexels.com/photos/3735709/pexels-photo-3735709.jpeg", duration: "4:15" },
        { title: "AI Sorting System", thumbnail: "https://images.pexels.com/photos/3951628/pexels-photo-3951628.jpeg", duration: "6:22" }
      ],
      methods: [
        "Smart bins with weight sensors",
        "Mobile app for waste tracking",
        "AI-powered contamination detection",
        "Gamified participation system",
        "Real-time feedback to residents"
      ],
      impact: {
        wasteProcessed: 1800,
        energySaved: 950,
        carbonReduced: 620,
        jobsCreated: 12
      },
      testimonials: [
        {
          name: "Vani Murthy Worm Rani",
          role: "Technology Coordinator",
          quote: "Our smart bin system made waste sorting effortless. Residents love the instant feedback and rewards.",
          avatar: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg"
        }
      ]
    },
    {
      id: 3,
      name: "RHA-INDIA",
      location: "Chhindwara, INDIA",
      image: "https://robinhoodarmy.com/assets/MissionSankalp78/Ajmer1.jpg",
      achievement: "Community Excellence 2024",
      wasteReduction: 72,
      participationRate: 89,
      yearWon: 2024,
      description: "The Robin Hood Army is a zero-funds volunteer organization that works to get surplus food from restaurants and communities to serve the less fortunate.Our Robins are largely students and young working professionals – everyone does this in their free time. The lesser fortunate sections of society we serve include homeless families, orphanages, patients from public hospitals and old age homes.",
      photos: [
        "https://robinhoodarmy.com/assets/MissionSankalp78/Gorakhpur1.jpg",
        "https://robinhoodarmy.com/assets/MissionSankalp78/Gorakhpur1.jpg",
        "https://robinhoodarmy.com/assets/MissionSankalp78/Jaisalmer1.jpg"
      ],
      videos: [
        { title: "Community Education Program", thumbnail: "https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg", duration: "8:45" },
        { title: "Children's Eco Workshop", thumbnail: "https://images.pexels.com/photos/3951628/pexels-photo-3951628.jpeg", duration: "5:12" }
      ],
      methods: [
        "Weekly educational workshops",
        "Children's eco-clubs",
        "Peer-to-peer mentoring",
        "Community composting program",
        "Monthly sustainability fairs"
      ],
      impact: {
        wasteProcessed: 1600,
        energySaved: 800,
        carbonReduced: 480,
        jobsCreated: 8
      },
      testimonials: [
        {
          name: "Ashutosh Sahu",
          role: "Resident Council President",
          quote: "Education was key to our success. When people understand the impact, they naturally want to participate.",
          avatar: "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg"
        }
      ]
    }
  ];

  const participationSteps = [
    {
      step: 1,
      title: "Register Your Community",
      description: "Sign up your residential society or community group",
      icon: Users
    },
    {
      step: 2,
      title: "Implement Segregation",
      description: "Start proper waste segregation with provided guidelines",
      icon: Target
    },
    {
      step: 3,
      title: "Track Progress",
      description: "Monitor your community's waste reduction metrics",
      icon: BookOpen
    },
    {
      step: 4,
      title: "Earn Recognition",
      description: "Compete for annual awards and monetary prizes",
      icon: Trophy
    }
  ];

  const benefits = [
    {
      title: "Monetary Rewards",
      description: "Win cash prizes up to $50,000 for top-performing communities",
      icon: Gift,
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      title: "Environmental Impact",
      description: "Reduce carbon footprint and contribute to a cleaner planet",
      icon: Star,
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      title: "Community Recognition",
      description: "Gain recognition as a model sustainable community",
      icon: Award,
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    },
    {
      title: "Skill Development",
      description: "Learn valuable environmental management skills",
      icon: BookOpen,
      color: "text-orange-600",
      bgColor: "bg-orange-100"
    }
  ];

  return (
    <section id="credits" className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Trophy className="h-10 w-10 text-yellow-500" />
            <h2 className="text-4xl font-bold text-gray-900">Society of the Year Awards</h2>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Celebrating communities that excel in waste segregation and environmental stewardship
          </p>
        </div>

        {/* Winning Societies */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {winningSocieties.map((society, index) => (
            <div
              key={society.id}
              className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-[fadeIn_0.6s_ease-out]"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="relative">
                <img
                  src={society.image}
                  alt={society.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center space-x-1">
                  <Award className="h-4 w-4" />
                  <span>Winner {society.yearWon}</span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{society.name}</h3>
                <p className="text-gray-600 mb-3">{society.location}</p>
                <p className="text-green-600 font-semibold mb-4">{society.achievement}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{society.wasteReduction}%</div>
                    <div className="text-xs text-gray-500">Waste Reduction</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{society.participationRate}%</div>
                    <div className="text-xs text-gray-500">Participation</div>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{society.description}</p>

                <button
                  onClick={() => setSelectedSociety(society)}
                  className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-700 transition-all duration-200 hover:shadow-lg transform hover:-translate-y-1 flex items-center justify-center space-x-2"
                >
                  <span>Learn More</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* How to Participate */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">How to Participate</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Join the competition and transform your community into a model of sustainability
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {participationSteps.map((step, index) => (
              <div
                key={step.step}
                className="text-center group animate-[slideInLeft_0.6s_ease-out]"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                    <step.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold">
                    {step.step}
                  </div>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h4>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <button 
              onClick={() => setShowRegistration(true)}
              className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-green-700 hover:to-blue-700 transition-all duration-200 hover:shadow-lg transform hover:-translate-y-1"
            >
              Register Your Community
            </button>
          </div>
        </div>

        {/* Benefits */}
        <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-3xl shadow-xl p-8 text-white mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Benefits of Participation</h3>
            <p className="text-purple-100 max-w-2xl mx-auto">
              Discover the rewards and advantages of joining our waste segregation program
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all duration-300 animate-[slideInRight_0.6s_ease-out]"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                  <benefit.icon className="h-6 w-6 text-white" />
                </div>
                <h4 className="text-lg font-semibold mb-2">{benefit.title}</h4>
                <p className="text-purple-100 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Educational Information */}
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Why Waste Segregation Matters</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Understanding the critical importance of proper waste management for our planet's future
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="bg-green-50 rounded-xl p-6">
                <h4 className="text-xl font-bold text-green-800 mb-3">Environmental Impact</h4>
                <ul className="space-y-2 text-green-700">
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Reduces landfill waste by up to 80%</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Prevents soil and water contamination</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Reduces greenhouse gas emissions</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Conserves natural resources</span>
                  </li>
                </ul>
              </div>

              <div className="bg-blue-50 rounded-xl p-6">
                <h4 className="text-xl font-bold text-blue-800 mb-3">Economic Benefits</h4>
                <ul className="space-y-2 text-blue-700">
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Creates local employment opportunities</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Generates revenue from recycled materials</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Reduces waste management costs</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Attracts eco-conscious businesses</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-orange-50 rounded-xl p-6">
                <h4 className="text-xl font-bold text-orange-800 mb-3">Global Statistics</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-600">2.01B</div>
                    <div className="text-sm text-orange-700">Tons of waste generated annually</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-600">33%</div>
                    <div className="text-sm text-orange-700">Current recycling rate globally</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-600">70%</div>
                    <div className="text-sm text-orange-700">Potential recycling rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-600">$200B</div>
                    <div className="text-sm text-orange-700">Annual economic opportunity</div>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 rounded-xl p-6">
                <h4 className="text-xl font-bold text-purple-800 mb-3">Success Metrics</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-purple-700">Average waste reduction</span>
                    <span className="font-bold text-purple-600">78%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-purple-700">Community participation</span>
                    <span className="font-bold text-purple-600">92%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-purple-700">Cost savings</span>
                    <span className="font-bold text-purple-600">$1.2M</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-purple-700">Jobs created</span>
                    <span className="font-bold text-purple-600">35</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Society Detail Modal */}
      {selectedSociety && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={() => setSelectedSociety(null)}
              className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white rounded-full p-2 transition-colors"
            >
              <X className="h-6 w-6 text-gray-600" />
            </button>

            {/* Modal Header */}
            <div className="relative">
              <img
                src={selectedSociety.image}
                alt={selectedSociety.name}
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-3xl font-bold mb-2">{selectedSociety.name}</h3>
                <p className="text-lg">{selectedSociety.location}</p>
                <div className="flex items-center space-x-2 mt-2">
                  <Trophy className="h-5 w-5 text-yellow-400" />
                  <span className="font-semibold">{selectedSociety.achievement}</span>
                </div>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="border-b border-gray-200">
              <div className="flex space-x-8 px-6">
                {['overview', 'methods', 'impact', 'gallery'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors duration-200 capitalize ${
                      activeTab === tab
                        ? 'border-green-500 text-green-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <p className="text-gray-700 leading-relaxed">{selectedSociety.description}</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-green-50 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-green-600">{selectedSociety.wasteReduction}%</div>
                      <div className="text-sm text-green-700">Waste Reduced</div>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-blue-600">{selectedSociety.participationRate}%</div>
                      <div className="text-sm text-blue-700">Participation</div>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-purple-600">{selectedSociety.impact.jobsCreated}</div>
                      <div className="text-sm text-purple-700">Jobs Created</div>
                    </div>
                    <div className="bg-orange-50 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-orange-600">{selectedSociety.yearWon}</div>
                      <div className="text-sm text-orange-700">Year Won</div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Testimonials</h4>
                    <div className="space-y-4">
                      {selectedSociety.testimonials.map((testimonial, index) => (
                        <div key={index} className="flex items-start space-x-4">
                          <img
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div>
                            <p className="text-gray-700 italic mb-2">"{testimonial.quote}"</p>
                            <div className="text-sm">
                              <span className="font-semibold text-gray-900">{testimonial.name}</span>
                              <span className="text-gray-500"> - {testimonial.role}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'methods' && (
                <div className="space-y-6">
                  <h4 className="text-2xl font-bold text-gray-900">Implementation Methods</h4>
                  <p className="text-gray-600">
                    Discover the specific strategies and techniques that led to {selectedSociety.name}'s success.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedSociety.methods.map((method, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors duration-200"
                      >
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-sm">{index + 1}</span>
                        </div>
                        <span className="text-gray-700 font-medium">{method}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'impact' && (
                <div className="space-y-6">
                  <h4 className="text-2xl font-bold text-gray-900">Environmental & Economic Impact</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-green-50 rounded-xl p-6 text-center">
                      <div className="text-3xl font-bold text-green-600 mb-2">
                        {selectedSociety.impact.wasteProcessed.toLocaleString()}
                      </div>
                      <div className="text-green-700 font-medium">Tons Processed</div>
                    </div>
                    <div className="bg-blue-50 rounded-xl p-6 text-center">
                      <div className="text-3xl font-bold text-blue-600 mb-2">
                        {selectedSociety.impact.energySaved.toLocaleString()}
                      </div>
                      <div className="text-blue-700 font-medium">MWh Energy Saved</div>
                    </div>
                    <div className="bg-purple-50 rounded-xl p-6 text-center">
                      <div className="text-3xl font-bold text-purple-600 mb-2">
                        {selectedSociety.impact.carbonReduced.toLocaleString()}
                      </div>
                      <div className="text-purple-700 font-medium">Tons CO₂ Reduced</div>
                    </div>
                    <div className="bg-orange-50 rounded-xl p-6 text-center">
                      <div className="text-3xl font-bold text-orange-600 mb-2">
                        {selectedSociety.impact.jobsCreated}
                      </div>
                      <div className="text-orange-700 font-medium">Jobs Created</div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-6">
                    <h5 className="text-lg font-semibold text-gray-900 mb-4">Long-term Benefits</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h6 className="font-medium text-gray-800 mb-2">Environmental</h6>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Cleaner air and water quality</li>
                          <li>• Reduced pollution levels</li>
                          <li>• Enhanced biodiversity</li>
                          <li>• Climate change mitigation</li>
                        </ul>
                      </div>
                      <div>
                        <h6 className="font-medium text-gray-800 mb-2">Community</h6>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Improved quality of life</li>
                          <li>• Stronger community bonds</li>
                          <li>• Educational opportunities</li>
                          <li>• Economic development</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'gallery' && (
                <div className="space-y-6">
                  <h4 className="text-2xl font-bold text-gray-900">Photos & Videos</h4>
                  
                  {/* Photos */}
                  <div>
                    <h5 className="text-lg font-semibold text-gray-800 mb-4">Community Photos</h5>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {selectedSociety.photos.map((photo, index) => (
                        <div
                          key={index}
                          className="relative group cursor-pointer overflow-hidden rounded-lg"
                        >
                          <img
                            src={photo}
                            alt={`${selectedSociety.name} photo ${index + 1}`}
                            className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                            <Camera className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Videos */}
                  <div>
                    <h5 className="text-lg font-semibold text-gray-800 mb-4">Educational Videos</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedSociety.videos.map((video, index) => (
                        <div
                          key={index}
                          className="relative group cursor-pointer overflow-hidden rounded-lg bg-gray-100"
                        >
                          <img
                            src={video.thumbnail}
                            alt={video.title}
                            className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                            <div className="bg-white/90 rounded-full p-3 group-hover:scale-110 transition-transform duration-300">
                              <Play className="h-6 w-6 text-gray-800 ml-1" />
                            </div>
                          </div>
                          <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                            {video.duration}
                          </div>
                          <div className="p-4">
                            <h6 className="font-medium text-gray-900">{video.title}</h6>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Community Registration Modal */}
      <CommunityRegistration 
        isOpen={showRegistration} 
        onClose={() => setShowRegistration(false)} 
      />
    </section>
  );
};

export default Credits;