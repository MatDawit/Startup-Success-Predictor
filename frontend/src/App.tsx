import React, { useState, useEffect } from 'react';
import { ArrowRight, ArrowLeft, Check, ChevronRight } from 'lucide-react';

interface FormData {
  country: string;
  markets: string[];
  funding: number;
}

type Page = 'landing' | 'location' | 'markets' | 'funding' | 'results' | 'model-details';

const initialFormData: FormData = {
  country: '',
  markets: [],
  funding: 1000000
};

const countries = [
  { name: 'Albania', code: 'ALB', flag: '🇦🇱' },
  { name: 'United Arab Emirates', code: 'ARE', flag: '🇦🇪' },
  { name: 'Argentina', code: 'ARG', flag: '🇦🇷' },
  { name: 'Armenia', code: 'ARM', flag: '🇦🇲' },
  { name: 'Australia', code: 'AUS', flag: '🇦🇺' },
  { name: 'Austria', code: 'AUT', flag: '🇦🇹' },
  { name: 'Azerbaijan', code: 'AZE', flag: '🇦🇿' },
  { name: 'Bahamas', code: 'BAH', flag: '🇧🇸' },
  { name: 'Belgium', code: 'BEL', flag: '�🇪' },
  { name: 'Bangladesh', code: 'BGD', flag: '🇧🇩' },
  { name: 'Bulgaria', code: 'BGR', flag: '🇧🇬' },
  { name: 'Bahrain', code: 'BHR', flag: '🇧🇭' },
  { name: 'Saint Barthélemy', code: 'BLM', flag: '🇧🇱' },
  { name: 'Belarus', code: 'BLR', flag: '🇧🇾' },
  { name: 'Belize', code: 'BLZ', flag: '🇧🇿' },
  { name: 'Bermuda', code: 'BMU', flag: '🇧🇲' },
  { name: 'Brazil', code: 'BRA', flag: '🇧🇷' },
  { name: 'Barbados', code: 'BRB', flag: '🇧🇧' },
  { name: 'Brunei Darussalam', code: 'BRN', flag: '🇧🇳' },
  { name: 'Botswana', code: 'BWA', flag: '🇧🇼' },
  { name: 'Canada', code: 'CAN', flag: '🇨🇦' },
  { name: 'Switzerland', code: 'CHE', flag: '🇨🇭' },
  { name: 'Chile', code: 'CHL', flag: '🇨🇱' },
  { name: 'China', code: 'CHN', flag: '🇨🇳' },
  { name: 'Côte d\'Ivoire', code: 'CIV', flag: '🇨🇮' },
  { name: 'Cameroon', code: 'CMR', flag: '🇨🇲' },
  { name: 'Colombia', code: 'COL', flag: '🇨🇴' },
  { name: 'Costa Rica', code: 'CRI', flag: '🇨🇷' },
  { name: 'Cayman Islands', code: 'CYM', flag: '🇰🇾' },
  { name: 'Cyprus', code: 'CYP', flag: '🇨🇾' },
  { name: 'Czech Republic', code: 'CZE', flag: '🇨🇿' },
  { name: 'Germany', code: 'DEU', flag: '🇩🇪' },
  { name: 'Dominica', code: 'DMA', flag: '🇩🇲' },
  { name: 'Denmark', code: 'DNK', flag: '🇩🇰' },
  { name: 'Dominican Republic', code: 'DOM', flag: '🇩🇴' },
  { name: 'Algeria', code: 'DZA', flag: '🇩🇿' },
  { name: 'Ecuador', code: 'ECU', flag: '🇪🇨' },
  { name: 'Egypt', code: 'EGY', flag: '🇪🇬' },
  { name: 'Spain', code: 'ESP', flag: '🇪🇸' },
  { name: 'Estonia', code: 'EST', flag: '🇪🇪' },
  { name: 'Finland', code: 'FIN', flag: '🇫🇮' },
  { name: 'France', code: 'FRA', flag: '🇫🇷' },
  { name: 'United Kingdom', code: 'GBR', flag: '🇬🇧' },
  { name: 'Georgia', code: 'GEO', flag: '🇬🇪' },
  { name: 'Guernsey', code: 'GGY', flag: '🇬🇬' },
  { name: 'Ghana', code: 'GHA', flag: '🇬🇭' },
  { name: 'Gibraltar', code: 'GIB', flag: '🇬🇮' },
  { name: 'Greece', code: 'GRC', flag: '🇬🇷' },
  { name: 'Grenada', code: 'GRD', flag: '🇬🇩' },
  { name: 'Guatemala', code: 'GTM', flag: '🇬🇹' },
  { name: 'Hong Kong', code: 'HKG', flag: '🇭🇰' },
  { name: 'Honduras', code: 'HND', flag: '🇭🇳' },
  { name: 'Croatia', code: 'HRV', flag: '🇭🇷' },
  { name: 'Hungary', code: 'HUN', flag: '🇭🇺' },
  { name: 'Indonesia', code: 'IDN', flag: '🇮🇩' },
  { name: 'India', code: 'IND', flag: '🇮🇳' },
  { name: 'Ireland', code: 'IRL', flag: '🇮🇪' },
  { name: 'Iran', code: 'IRN', flag: '🇮🇷' },
  { name: 'Iceland', code: 'ISL', flag: '🇮🇸' },
  { name: 'Israel', code: 'ISR', flag: '🇮🇱' },
  { name: 'Italy', code: 'ITA', flag: '🇮🇹' },
  { name: 'Jamaica', code: 'JAM', flag: '🇯🇲' },
  { name: 'Jersey', code: 'JEY', flag: '🇯🇪' },
  { name: 'Jordan', code: 'JOR', flag: '🇯🇴' },
  { name: 'Japan', code: 'JPN', flag: '🇯🇵' },
  { name: 'Kazakhstan', code: 'KAZ', flag: '🇰🇿' },
  { name: 'Kenya', code: 'KEN', flag: '🇰🇪' },
  { name: 'Cambodia', code: 'KHM', flag: '🇰🇭' },
  { name: 'Saint Kitts and Nevis', code: 'KNA', flag: '🇰🇳' },
  { name: 'South Korea', code: 'KOR', flag: '🇰🇷' },
  { name: 'Kuwait', code: 'KWT', flag: '🇰🇼' },
  { name: 'Laos', code: 'LAO', flag: '🇱🇦' },
  { name: 'Lebanon', code: 'LBN', flag: '🇱🇧' },
  { name: 'Liechtenstein', code: 'LIE', flag: '🇱🇮' },
  { name: 'Sri Lanka', code: 'LKA', flag: '🇱🇰' },
  { name: 'Lithuania', code: 'LTU', flag: '🇱🇹' },
  { name: 'Luxembourg', code: 'LUX', flag: '🇱🇺' },
  { name: 'Latvia', code: 'LVA', flag: '🇱🇻' },
  { name: 'Saint Martin', code: 'MAF', flag: '🇲🇫' },
  { name: 'Morocco', code: 'MAR', flag: '🇲🇦' },
  { name: 'Monaco', code: 'MCO', flag: '🇲🇨' },
  { name: 'Moldova', code: 'MDA', flag: '🇲🇩' },
  { name: 'Mexico', code: 'MEX', flag: '🇲🇽' },
  { name: 'North Macedonia', code: 'MKD', flag: '🇲🇰' },
  { name: 'Malta', code: 'MLT', flag: '🇲🇹' },
  { name: 'Myanmar', code: 'MMR', flag: '🇲🇲' },
  { name: 'Montenegro', code: 'MNE', flag: '🇲🇪' },
  { name: 'Mozambique', code: 'MOZ', flag: '🇲🇿' },
  { name: 'Mauritius', code: 'MUS', flag: '🇲🇺' },
  { name: 'Malaysia', code: 'MYS', flag: '🇲🇾' },
  { name: 'Nigeria', code: 'NGA', flag: '🇳🇬' },
  { name: 'Nicaragua', code: 'NIC', flag: '🇳🇮' },
  { name: 'Netherlands', code: 'NLD', flag: '🇳🇱' },
  { name: 'Norway', code: 'NOR', flag: '🇳🇴' },
  { name: 'Nepal', code: 'NPL', flag: '🇳🇵' },
  { name: 'New Zealand', code: 'NZL', flag: '🇳🇿' },
  { name: 'Oman', code: 'OMN', flag: '🇴🇲' },
  { name: 'Pakistan', code: 'PAK', flag: '🇵🇰' },
  { name: 'Panama', code: 'PAN', flag: '🇵🇦' },
  { name: 'Peru', code: 'PER', flag: '🇵🇪' },
  { name: 'Philippines', code: 'PHL', flag: '🇵🇭' },
  { name: 'Poland', code: 'POL', flag: '🇵🇱' },
  { name: 'Puerto Rico', code: 'PRI', flag: '🇵🇷' },
  { name: 'Portugal', code: 'PRT', flag: '🇵🇹' },
  { name: 'Paraguay', code: 'PRY', flag: '🇵🇾' },
  { name: 'Palestine', code: 'PSE', flag: '🇵🇸' },
  { name: 'Qatar', code: 'QAT', flag: '🇶🇦' },
  { name: 'Romania', code: 'ROM', flag: '🇷🇴' },
  { name: 'Russia', code: 'RUS', flag: '🇷🇺' },
  { name: 'Rwanda', code: 'RWA', flag: '🇷🇼' },
  { name: 'Saudi Arabia', code: 'SAU', flag: '🇸🇦' },
  { name: 'Senegal', code: 'SEN', flag: '🇸🇳' },
  { name: 'Singapore', code: 'SGP', flag: '🇸🇬' },
  { name: 'El Salvador', code: 'SLV', flag: '🇸🇻' },
  { name: 'Somalia', code: 'SOM', flag: '🇸🇴' },
  { name: 'Serbia', code: 'SRB', flag: '🇷🇸' },
  { name: 'Slovakia', code: 'SVK', flag: '🇸🇰' },
  { name: 'Slovenia', code: 'SVN', flag: '🇸🇮' },
  { name: 'Sweden', code: 'SWE', flag: '🇸🇪' },
  { name: 'Seychelles', code: 'SYC', flag: '🇸🇨' },
  { name: 'Tanzania', code: 'TAN', flag: '🇹🇿' },
  { name: 'Togo', code: 'TGO', flag: '🇹🇬' },
  { name: 'Thailand', code: 'THA', flag: '🇹🇭' },
  { name: 'Trinidad and Tobago', code: 'TTO', flag: '🇹🇹' },
  { name: 'Tunisia', code: 'TUN', flag: '🇹🇳' },
  { name: 'Turkey', code: 'TUR', flag: '🇹🇷' },
  { name: 'Taiwan', code: 'TWN', flag: '🇹🇼' },
  { name: 'Uganda', code: 'UGA', flag: '🇺🇬' },
  { name: 'Ukraine', code: 'UKR', flag: '🇺🇦' },
  { name: 'Uruguay', code: 'URY', flag: '🇺🇾' },
  { name: 'United States', code: 'USA', flag: '🇺🇸' },
  { name: 'Uzbekistan', code: 'UZB', flag: '🇺🇿' },
  { name: 'Venezuela', code: 'VEN', flag: '🇻🇪' },
  { name: 'Vietnam', code: 'VNM', flag: '🇻🇳' },
  { name: 'South Africa', code: 'ZAF', flag: '🇿🇦' },
  { name: 'Zambia', code: 'ZMB', flag: '🇿🇲' },
  { name: 'Zimbabwe', code: 'ZWE', flag: '🇿🇼' }
];

const marketCategories = [
  '3D', '3D Printing', '3D Technology', 'Accounting', 'Advanced Materials',
  'Advertising', 'Advertising Networks', 'Advertising Platforms', 'Advice',
  'Aerospace', 'Agriculture', 'Algorithms', 'All Markets', 'All Students',
  'Alternative Medicine', 'Alumni', 'Analytics', 'Android', 'Angels',
  'Animal Feed', 'App Stores', 'Application Platforms', 'Apps', 'Architecture',
  'Art', 'Artists Globally', 'Assisitive Technology', 'Auctions', 'Audio',
  'Audiobooks', 'Augmented Reality', 'Automotive', 'B2B', 'Babies',
  'Baby Accessories', 'Banking', 'Batteries', 'Beauty', 'Bicycles', 'Big Data',
  'Big Data Analytics', 'Billing', 'Bio-Pharm', 'Biofuels', 'Bioinformatics',
  'Biometrics', 'Biotechnology', 'Bitcoin', 'Blogging Platforms', 'Brand Marketing',
  'Brewing', 'Broadcasting', 'Building Products', 'Business Analytics',
  'Business Development', 'Business Intelligence', 'Business Productivity',
  'Business Services', 'CAD', 'CRM', 'Cable', 'Cannabis', 'Cars', 'Charities',
  'Charity', 'Chat', 'Chemicals', 'Child Care', 'Civil Engineers', 'Classifieds',
  'Clean Energy', 'Clean Technology', 'Clean Technology IT', 'Clinical Trials',
  'Cloud Computing', 'Cloud Data Services', 'Cloud Management', 'Cloud Security',
  'Coffee', 'Collaboration', 'Collaborative Consumption', 'Collectibles', 'Comics',
  'Commercial Real Estate', 'Communications Hardware', 'Communications Infrastructure',
  'Communities', 'Computer Vision', 'Computers', 'Construction', 'Consulting',
  'Consumer Behavior', 'Consumer Electronics', 'Consumer Goods', 'Consumer Internet',
  'Consumers', 'Content', 'Content Creators', 'Content Delivery', 'Content Discovery',
  'Content Syndication', 'Cooking', 'Corporate IT', 'Corporate Training',
  'Corporate Wellness', 'Cosmetics', 'Coupons', 'Craft Beer', 'Creative', 'Credit',
  'Crowdfunding', 'Crowdsourcing', 'Curated Web', 'Customer Service', 'Cyber Security',
  'Data Center Automation', 'Data Centers', 'Data Integration', 'Data Mining',
  'Data Security', 'Data Visualization', 'Databases', 'Defense', 'Delivery',
  'Dental', 'Design', 'Designers', 'Developer APIs', 'Developer Tools',
  'Development Platforms', 'Diagnostics', 'Digital Entertainment', 'Digital Media',
  'Digital Signage', 'Discounts', 'Distribution', 'Distributors', 'Document Management',
  'Domains', 'Drones', 'E-Books', 'E-Commerce', 'E-Commerce Platforms', 'EBooks',
  'Early-Stage Technology', 'EdTech', 'Education', 'Educational Games',
  'Electric Vehicles', 'Electrical Distribution', 'Electronics', 'Email',
  'Email Marketing', 'Embedded Hardware and Software', 'Emerging Markets',
  'Employment', 'Energy', 'Energy Efficiency', 'Energy IT', 'Energy Management',
  'Enterprise Resource Planning', 'Enterprise Security', 'Enterprise Software',
  'Enterprises', 'Entertainment', 'Entertainment Industry', 'Entrepreneur',
  'Environmental Innovation', 'Event Management', 'Events', 'Eyewear',
  'Fantasy Sports', 'Farming', 'Fashion', 'Field Support Services', 'Film',
  'Film Production', 'FinTech', 'Finance', 'Finance Technology', 'Financial Exchanges',
  'Financial Services', 'Fitness', 'Flash Sales', 'Flash Storage', 'Fleet Management',
  'Fmcg', 'Food Processing', 'Forums', 'Fraud Detection', 'Freelancers', 'Fruit',
  'Furniture', 'Gadget', 'Gambling', 'Game', 'Games', 'Gay & Lesbian',
  'General Public Worldwide', 'Genetic Testing', 'Gift Card', 'Gift Registries',
  'Gold', 'Google Glass', 'Government Innovation', 'Governments', 'Graphics',
  'Hardware', 'Hardware + Software', 'Health Care', 'Health Care Information Technology',
  'Health Diagnostics', 'Health Services Industry', 'Health and Insurance',
  'Health and Wellness', 'Healthcare Services', 'Heavy Industry', 'High Schools',
  'Home & Garden', 'Home Automation', 'Home Decor', 'Home Renovation', 'Hospitality',
  'Hospitals', 'Hotels', 'Human Computer Interaction', 'Human Resource Automation',
  'Human Resources', 'IT Management', 'IT and Cybersecurity', 'Identity Management',
  'Image Recognition', 'Impact Investing', 'In-Flight Entertainment', 'Incubators',
  'Industrial', 'Industrial Automation', 'Information Security', 'Information Services',
  'Information Technology', 'Infrastructure', 'Innovation Engineering',
  'Innovation Management', 'Insurance', 'Intellectual Asset Management',
  'Intelligent Systems', 'Interface Design', 'Interior Design', 'Internet',
  'Internet Marketing', 'Internet Radio Market', 'Internet Service Providers',
  'Internet of Things', 'Investment Management', 'Jewelry', 'Journalism', 'Kids',
  'Knowledge Management', 'Landscaping', 'Language Learning', 'Lasers',
  'Law Enforcement', 'Lead Generation', 'Legal', 'Leisure', 'Licensing',
  'Life Sciences', 'Lifestyle', 'Lifestyle Products', 'Lighting', 'Limousines',
  'Lingerie', 'Linux', 'Local', 'Local Based Services', 'Local Businesses',
  'Local Commerce', 'Local Search', 'Location Based Services', 'Logistics',
  'Logistics Company', 'Lotteries', 'Low Bid Auctions', 'Loyalty Programs',
  'Machine Learning', 'Manufacturing', 'Maps', 'Market Research', 'Marketing Automation',
  'Marketplaces', 'Match-Making', 'Material Science', 'Mechanical Solutions', 'Media',
  'Medical', 'Medical Devices', 'Medical Professionals', 'Messaging', 'Minerals',
  'Mining Technologies', 'Mobile', 'Mobile Advertising', 'Mobile Analytics',
  'Mobile Commerce', 'Mobile Devices', 'Mobile Games', 'Mobile Health', 'Mobile Payments',
  'Mobile Security', 'Mobile Shopping', 'Mobile Social', 'Mobile Software Tools',
  'Mobile Video', 'Mobility', 'Moneymaking', 'Music', 'Music Education', 'Music Services',
  'Music Venues', 'Musical Instruments', 'Nanotechnology', 'Natural Gas Uses',
  'Natural Language Processing', 'Natural Resources', 'Navigation', 'Network Security',
  'Networking', 'Neuroscience', 'New Technologies', 'News', 'Nightlife', 'Non Profit',
  'Non-Tech', 'Nonprofits', 'Nutrition', 'Office Space', 'Oil', 'Oil & Gas',
  'Oil and Gas', 'Online Dating', 'Online Education', 'Online Gaming', 'Online Rental',
  'Online Reservations', 'Online Scheduling', 'Online Shopping', 'Online Travel',
  'Online Video Advertising', 'Open Source', 'Optical Communications', 'Optimization',
  'Organic', 'Organic Food', 'Outdoors', 'Outsourcing', 'P2P Money Transfer',
  'Parenting', 'Parking', 'Payments', 'Peer-to-Peer', 'Performance Marketing',
  'Personal Data', 'Personal Finance', 'Personal Health', 'Pets', 'Pharmaceuticals',
  'Photo Editing', 'Photo Sharing', 'Photography', 'Point of Sale', 'Politics',
  'Portals', 'Postal and Courier Services', 'Pre Seed', 'Price Comparison', 'Printing',
  'Privacy', 'Private School', 'Private Social Networking', 'Procurement',
  'Product Design', 'Product Search', 'Productivity Software', 'Professional Networking',
  'Professional Services', 'Project Management', 'Property Management', 'Psychology',
  'Public Relations', 'Public Safety', 'Public Transportation', 'Publishing', 'Q&A',
  'Racing', 'Real Estate', 'Real Estate Investors', 'Real Time', 'Realtors',
  'Recruiting', 'Recycling', 'Religion', 'Renewable Energies', 'Renewable Tech',
  'Rental Housing', 'Reputation', 'Restaurants', 'Retail', 'Retail Technology',
  'Retirement', 'Reviews and Recommendations', 'Risk Management', 'Robotics', 'SEO',
  'SNS', 'SaaS', 'Sales Automation', 'Sales and Marketing', 'Search', 'Search Marketing',
  'Security', 'Semiconductor Manufacturing Equipment', 'Semiconductors', 'Senior Health',
  'Sensors', 'Service Industries', 'Service Providers', 'Services', 'Shipping', 'Shoes',
  'Shopping', 'Skill Gaming', 'Small and Medium Businesses', 'Smart Grid',
  'Social + Mobile + Local', 'Social Bookmarking', 'Social Business', 'Social CRM',
  'Social Commerce', 'Social Fundraising', 'Social Games', 'Social Media',
  'Social Media Management', 'Social Media Marketing', 'Social Media Platforms',
  'Social Network Media', 'Social News', 'Social Recruiting', 'Social Travel',
  'Software', 'Solar', 'Space Travel', 'Spas', 'Specialty Chemicals', 'Specialty Foods',
  'Specialty Retail', 'Sporting Goods', 'Sports', 'Staffing Firms', 'Startups',
  'Stock Exchanges', 'Storage', 'Subscription Service', 'Supply Chain Management',
  'Surveys', 'Swimming', 'Systems', 'Taxis', 'Tea', 'Technology', 'Telecommunications',
  'Television', 'Textiles', 'Theatre', 'Therapeutics', 'Ticketing', 'Tourism', 'Toys',
  'Tracking', 'Trading', 'Training', 'Translation', 'Transportation', 'Travel',
  'Travel & Tourism', 'Universities', 'University Students', 'Unmanned Air Systems',
  'User Experience Design', 'User Interface', 'Utilities', 'Vacation Rentals',
  'Vending and Concessions', 'Venture Capital', 'Veterinary', 'Video', 'Video Games',
  'Video Streaming', 'Video on Demand', 'Virtual Workforces', 'VoIP', 'Waste Management',
  'Watch', 'Water', 'Water Purification', 'Wearables', 'Web Design', 'Web Development',
  'Web Hosting', 'Web Tools', 'Weddings', 'Wholesale', 'Wine And Spirits', 'Wireless',
  'Women', 'Young Adults', 'iOS', 'iPhone', 'mHealth'
];

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [searchTerm, setSearchTerm] = useState('');
  const [prediction, setPrediction] = useState(0);

  const getPrediction = async () => {
    const markets = formData.markets.join(",").trim();
    const country = formData.country.trim();
    const funding_rounds = 1; //Placeholder (replace with actual funding rounds later)
    
    //Testing
    console.log("country: " + country);
    console.log("markets: " + markets);
    console.log("funding: " + funding_rounds);
    console.log("request: " + `http://127.0.0.1:8000/get_prediction?country_str=${country}&funding_rounds=${funding_rounds}&categories_liststr=${markets}`)
    
    const response = await fetch(`http://127.0.0.1:8000/get_prediction?country_str=${country}&funding_rounds=${funding_rounds}&categories_liststr=${markets}`);
    const data = await response.json();
    setPrediction(data);
  }

  console.log("saved prediction: " + prediction);

  const handlePageChange = (page: Page) => {
    setCurrentPage(page);
    setSearchTerm(''); // Clear search term on every page change
    if (page === "results") {
      getPrediction();
    }
  };

  const handleStartOver = () => {
    setFormData(initialFormData);
    handlePageChange('landing');
  };

  const handleCountrySelect = (country: string) => {
    setFormData(prev => ({ ...prev, country }));
  };

  const handleMarketToggle = (market: string) => {
    setFormData(prev => ({
      ...prev,
      markets: prev.markets.includes(market)
          ? prev.markets.filter(m => m !== market)
          : [...prev.markets, market]
    }));
  };

  const formatFunding = (amount: number) => {
    if (amount >= 1000000) {
      return `${(amount / 1000000).toFixed(1)}M`;
    } else if (amount >= 1000) {
      return `${Math.round(amount / 1000)}K`;
    }
    return `${amount.toLocaleString()}`;
  };

  const filteredCountries = countries.filter(country =>
      country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredMarkets = marketCategories.filter(market =>
      market.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Landing Page
  if (currentPage === 'landing') {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
          <div className="absolute top-6 right-6">
            <button
                onClick={() => handlePageChange('model-details')}
                className="px-4 py-2 bg-white border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Model Details
            </button>
          </div>

          <div className="max-w-6xl mx-auto flex items-center gap-12">
            <div className="w-96 h-96 rounded-3xl bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/20"></div>
            </div>

            <div className="flex-1 max-w-xl">
              <h1 className="text-6xl font-bold text-gray-900 mb-6">
                Startup <span className="text-pink-500">Success</span><br />
                Predictor
              </h1>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">Predictions based on historical startup data</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">Powered by AI</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">Fast and easy to use</span>
                </div>
              </div>

              <button
                  onClick={() => handlePageChange('location')}
                  className="bg-black text-white px-8 py-4 rounded-full font-semibold hover:bg-gray-800 transition-colors"
              >
                Put it to the test
              </button>
            </div>
          </div>
        </div>
    );
  }

  // Model Details Page
  if (currentPage === 'model-details') {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
          <div className="absolute top-6 right-6">
            <button
                onClick={() => handlePageChange('landing')}
                className="px-4 py-2 bg-white border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Return Home
            </button>
          </div>

          <div className="max-w-6xl mx-auto flex items-center gap-12">
            <div className="w-96 h-96 rounded-3xl bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/20"></div>
            </div>

            <div className="flex-1 max-w-2xl">
              <h1 className="text-6xl font-bold text-gray-900 mb-8">
                Model Details
              </h1>

              <div className="space-y-6 text-gray-700">
                <p className="text-lg">
                  Trained on over <strong>66k+</strong> rows of startup data
                </p>

                <ul className="ml-6">
                  <li className="mb-2">• Kaggle "Startup Success/Fail Dataset" (link)</li>
                </ul>

                <p className="text-lg">
                  Predictions aggregated from 5 random forest classifiers
                </p>

                <ul className="ml-6">
                  <li className="mb-2">• <strong>98%</strong> testing accuracy rate</li>
                </ul>

                <p className="text-lg mt-8">
                  feel free to add more! (credits, research question, etc.)
                </p>

                <p className="text-gray-500 mt-8">
                  Last updated: 7/28/2025
                </p>
              </div>
            </div>
          </div>
        </div>
    );
  }

  // Location Selection Page
  if (currentPage === 'location') {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 relative">
          {/* Decorative circles */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gradient-to-r from-red-300 to-red-400 opacity-80 -translate-x-1/2"></div>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-gradient-to-l from-blue-300 to-blue-400 opacity-80 translate-x-1/2"></div>

          <div className="max-w-2xl mx-auto text-center relative z-10">
            {/* Progress dots */}
            <div className="flex justify-center gap-2 mb-12">
              <div className="w-2 h-2 rounded-full bg-gray-800"></div>
              <div className="w-2 h-2 rounded-full bg-gray-300"></div>
              <div className="w-2 h-2 rounded-full bg-gray-300"></div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-xl">
              <h1 className="text-3xl font-bold text-gray-900 mb-8">
                Tell me about your startup
              </h1>

              <ChevronRight className="w-8 h-8 text-gray-400 mx-auto mb-12" />

              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                Where is your startup located?
              </h2>

              <div className="mb-6">
                <input
                    type="text"
                    placeholder="Search countries..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-100 rounded-lg border-0 focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                />
              </div>

              <div className="space-y-2 max-h-60 overflow-y-auto">
                {filteredCountries.map((country) => (
                    <button
                        key={country.code}
                        onClick={() => handleCountrySelect(country.code)}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                            formData.country === country.name
                                ? 'bg-blue-50 border-2 border-blue-200'
                                : 'hover:bg-gray-50 border-2 border-transparent'
                        }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{country.flag}</span>
                        <span className="font-medium">{country.name}</span>
                      </div>
                      <span className="text-gray-400 text-sm">{country.code}</span>
                    </button>
                ))}
              </div>

              <div className="flex justify-between mt-8">
                <button
                    onClick={() => handlePageChange('landing')}
                    className="flex items-center gap-2 px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>

                <button
                    onClick={() => handlePageChange('markets')}
                    disabled={!formData.country}
                    className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-gray-800 transition-colors"
                >
                  Next
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
    );
  }

  // Markets Selection Page
  if (currentPage === 'markets') {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 relative">
          {/* Decorative circles */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gradient-to-r from-blue-300 to-blue-400 opacity-80 -translate-x-1/2"></div>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-gradient-to-l from-yellow-300 to-orange-300 opacity-80 translate-x-1/2"></div>

          <div className="max-w-2xl mx-auto text-center relative z-10">
            {/* Progress dots */}
            <div className="flex justify-center gap-2 mb-12">
              <div className="w-2 h-2 rounded-full bg-gray-800"></div>
              <div className="w-2 h-2 rounded-full bg-gray-800"></div>
              <div className="w-2 h-2 rounded-full bg-gray-300"></div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-xl">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                What markets are you in? (select all that apply)
              </h2>

              <div className="mb-6">
                <input
                    type="text"
                    placeholder="Search categories..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-100 rounded-lg border-0 focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                />
              </div>

              <div className="space-y-2 max-h-60 overflow-y-auto">
                {filteredMarkets.map((market) => (
                    <button
                        key={market}
                        onClick={() => handleMarketToggle(market)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                            formData.markets.includes(market)
                                ? 'bg-blue-50 border-2 border-blue-200'
                                : 'hover:bg-gray-50 border-2 border-transparent'
                        }`}
                    >
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                          formData.markets.includes(market)
                              ? 'bg-black border-black'
                              : 'border-gray-300'
                      }`}>
                        {formData.markets.includes(market) && (
                            <Check className="w-3 h-3 text-white" />
                        )}
                      </div>
                      <span className="font-medium">{market}</span>
                    </button>
                ))}
              </div>

              <div className="flex justify-between mt-8">
                <button
                    onClick={() => handlePageChange('location')}
                    className="flex items-center gap-2 px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>

                <button
                    onClick={() => handlePageChange('funding')}
                    disabled={formData.markets.length === 0}
                    className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-gray-800 transition-colors"
                >
                  Next
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
    );
  }

  // Funding Selection Page
  if (currentPage === 'funding') {
    const maxFunding = 10000000; // $10M

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 relative">
          {/* Decorative circles */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gradient-to-r from-purple-300 to-pink-300 opacity-80 -translate-x-1/2"></div>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-gradient-to-l from-orange-300 to-red-300 opacity-80 translate-x-1/2"></div>

          <div className="max-w-2xl mx-auto text-center relative z-10">
            {/* Progress dots */}
            <div className="flex justify-center gap-2 mb-12">
              <div className="w-2 h-2 rounded-full bg-gray-800"></div>
              <div className="w-2 h-2 rounded-full bg-gray-800"></div>
              <div className="w-2 h-2 rounded-full bg-gray-800"></div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-xl">
              <h2 className="text-xl font-semibold text-gray-800 mb-8">
                Startup funding raised (in USD)?
              </h2>

              <div className="mb-8">
                <div className="relative mb-6">
                  <div className="bg-orange-200 text-orange-800 px-4 py-2 rounded-full inline-block font-bold text-lg">
                    {formatFunding(formData.funding)}
                  </div>
                </div>

                <input
                    type="range"
                    min="0"
                    max={maxFunding}
                    step="1000"
                    value={formData.funding}
                    onChange={(e) => setFormData(prev => ({ ...prev, funding: parseInt(e.target.value) }))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mb-4"
                    style={{
                      background: `linear-gradient(to right, #F97316 0%, #F97316 ${(formData.funding / maxFunding) * 100}%, #E5E7EB ${(formData.funding / maxFunding) * 100}%, #E5E7EB 100%)`
                    }}
                />

                {/* Range labels */}
                <div className="flex justify-between text-sm text-gray-500 px-1">
                  <span>$0</span>
                  <span>$2.5M</span>
                  <span>$5M</span>
                  <span>$7.5M</span>
                  <span>$10M</span>
                </div>
              </div>

              <div className="bg-gray-100 rounded-lg p-4 mb-8">
                <div className="text-sm text-gray-600 mb-1">Amount Selected:</div>
                <div className="text-2xl font-bold text-gray-900">
                  ${formData.funding.toLocaleString()}
                </div>
              </div>

              <div className="flex justify-between">
                <button
                    onClick={() => handlePageChange('markets')}
                    className="flex items-center gap-2 px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>

                <button
                    onClick={() => handlePageChange('results')}
                    className="bg-black text-white px-8 py-4 rounded-full font-semibold hover:bg-gray-800 transition-colors"
                >
                  Generate Predictions
                </button>
              </div>
            </div>
          </div>
        </div>
    );
  }

  // Results Page (placeholder - you can customize this)
  if (currentPage === 'results') {
    const successProbability = Math.random() * 100;

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-white rounded-3xl p-12 shadow-xl">
              <h1 className="text-4xl font-bold text-gray-900 mb-8">
                Prediction Results
              </h1>

              <div className="mb-8">
                <div className={`text-6xl font-bold mb-4 ${
                    successProbability > 70 ? 'text-green-500' :
                        successProbability > 40 ? 'text-yellow-500' : 'text-red-500'
                }`}>
                  {successProbability.toFixed(1)}%
                </div>
                <p className="text-xl text-gray-600">Probability of Success</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">Location</h3>
                  <p className="text-gray-600">{formData.country}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">
                    {formData.markets.length === 1 ? 'Market' : 'Markets'}
                  </h3>
                  <p className="text-gray-600">{formData.markets.join(', ')}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">Funding</h3>
                  <p className="text-gray-600">{formatFunding(formData.funding)}</p>
                </div>
              </div>

              <button
                  onClick={handleStartOver}
                  className="bg-black text-white px-8 py-4 rounded-full font-semibold hover:bg-gray-800 transition-colors"
              >
                Start Over
              </button>
            </div>
          </div>
        </div>
    );
  }

  return null;
}

export default App;