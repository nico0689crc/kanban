const projects = [
  {
    title: 'Website Development',
    sections: [
      {
        title: 'To Do',
        tasks: [
          {
            title: 'Research Competitor Websites',
            description: 'Analyze competitor websites to gather insights for website design and functionality.',
            priority: 'hight',
            tags: ['CompetitiveAnalysis', 'MarketResearch'],
          },
          {
            title: 'Gather Requirements',
            description: 'Meet with stakeholders to gather requirements and specifications for the website.',
            priority: 'medium',
            tags: ['RequirementGathering', 'StakeholderMeeting'],
          },
          {
            title: 'Create Wireframes',
            description: 'Design wireframes to visualize the layout and structure of the website.',
            priority: 'medium',
            tags: ['Wireframing', 'Design'],
          },
          {
            title: 'Develop Frontend',
            description: 'Code the frontend components and user interface of the website.',
            priority: 'hight',
            tags: ['FrontendDevelopment', 'WebDesign'],
          },
          {
            title: 'Set Up Hosting',
            description: 'Select a hosting provider and configure server settings for website deployment.',
            priority: 'medium',
            tags: ['HostingSetup', 'Deployment'],
          },
        ],
      },
      {
        title: 'In Progress',
        tasks: [
          {
            title: 'Implement Backend Functionality',
            description: 'Develop backend functionality and database integration for the website.',
            priority: 'hight',
            tags: ['BackendDevelopment', 'DatabaseIntegration'],
          },
          {
            title: 'Design UI/UX',
            description: 'Create user interface designs and improve user experience.',
            priority: 'medium',
            tags: ['UIUXDesign', 'UserExperience'],
          },
          {
            title: 'Optimize for SEO',
            description: 'Optimize website content and structure for search engine visibility.',
            priority: 'medium',
            tags: ['SEO', 'SearchEngineOptimization'],
          },
          {
            title: 'Implement Responsive Design',
            description: 'Ensure the website is responsive and compatible with various devices.',
            priority: 'hight',
            tags: ['ResponsiveDesign', 'MobileCompatibility'],
          },
          {
            title: 'Integration Testing',
            description: 'Test integration between frontend and backend components.',
            priority: 'hight',
            tags: ['IntegrationTesting', 'QualityAssurance'],
          },
        ],
      },
      {
        title: 'Testing',
        tasks: [
          {
            title: 'User Acceptance Testing',
            description: 'Engage stakeholders to test the website and provide feedback.',
            priority: 'medium',
            tags: ['UAT', 'StakeholderFeedback'],
          },
          {
            title: 'Cross-Browser Testing',
            description: 'Test website functionality on different web browsers.',
            priority: 'hight',
            tags: ['CrossBrowserTesting', 'CompatibilityTesting'],
          },
          {
            title: 'Performance Testing',
            description: 'Analyze website performance and optimize loading times.',
            priority: 'medium',
            tags: ['PerformanceTesting', 'Optimization'],
          },
          {
            title: 'Security Testing',
            description: 'Check for vulnerabilities and ensure website security measures are in place.',
            priority: 'hight',
            tags: ['SecurityTesting', 'Cybersecurity'],
          },
          {
            title: 'Accessibility Testing',
            description: 'Ensure website accessibility compliance for users with disabilities.',
            priority: 'medium',
            tags: ['AccessibilityTesting', 'WCAGCompliance'],
          },
        ],
      },
      {
        title: 'Done',
        tasks: [
          {
            title: 'Deploy Website',
            description: 'Release the website to production and make it publicly accessible.',
            priority: 'hight',
            tags: ['Deployment', 'GoLive'],
          },
          {
            title: 'Monitor Performance',
            description: 'Regularly monitor website performance and user engagement metrics.',
            priority: 'medium',
            tags: ['PerformanceMonitoring', 'Analytics'],
          },
          {
            title: 'Client Training',
            description: 'Provide training sessions for clients to manage and update website content.',
            priority: 'medium',
            tags: ['ClientTraining', 'KnowledgeTransfer'],
          },
          {
            title: 'Documentation',
            description: 'Prepare documentation for website maintenance and future reference.',
            priority: 'low',
            tags: ['Documentation', 'KnowledgeBase'],
          },
          {
            title: 'Project Review',
            description: 'Conduct a project review meeting to gather feedback and lessons learned.',
            priority: 'medium',
            tags: ['ProjectReview', 'LessonsLearned'],
          },
        ],
      },
    ],
  },
  {
    title: 'Marketing Campaign Launch',
    sections: [
      {
        title: 'To Do',
        tasks: [
          {
            title: 'Define Target Audience',
            description: 'Identify the target demographic and buyer personas for the marketing campaign.',
            priority: 'hight',
            tags: ['TargetAudience', 'PersonaDevelopment'],
          },
          {
            title: 'Develop Campaign Strategy',
            description: 'Create a comprehensive strategy outlining campaign goals, messaging, and channels.',
            priority: 'hight',
            tags: ['CampaignStrategy', 'MarketingPlan'],
          },
          {
            title: 'Design Creative Assets',
            description: 'Design visuals, ad copy, and other creative assets for the campaign.',
            priority: 'medium',
            tags: ['CreativeDesign', 'ContentCreation'],
          },
          {
            title: 'Set Budget and Allocate Resources',
            description: 'Determine the campaign budget and allocate resources accordingly.',
            priority: 'medium',
            tags: ['Budgeting', 'ResourceAllocation'],
          },
          {
            title: 'Schedule Campaign Timeline',
            description: 'Plan and schedule key milestones and deadlines for the campaign.',
            priority: 'medium',
            tags: ['Timeline', 'Scheduling'],
          },
        ],
      },
      {
        title: 'In Progress',
        tasks: [
          {
            title: 'Create Landing Pages',
            description: 'Develop landing pages to capture leads and drive conversions.',
            priority: 'hight',
            tags: ['LandingPages', 'ConversionOptimization'],
          },
          {
            title: 'Launch Email Marketing Campaign',
            description: 'Deploy targeted email campaigns to engage with subscribers and prospects.',
            priority: 'hight',
            tags: ['EmailMarketing', 'LeadNurturing'],
          },
          {
            title: 'Setup Social Media Ads',
            description: 'Configure and launch paid advertising campaigns on social media platforms.',
            priority: 'medium',
            tags: ['SocialMediaAds', 'PaidAdvertising'],
          },
          {
            title: 'Create Blog Content',
            description: 'Write blog posts and articles to support the campaign messaging and objectives.',
            priority: 'medium',
            tags: ['Blogging', 'ContentMarketing'],
          },
          {
            title: 'Prepare Marketing Collateral',
            description: 'Produce brochures, flyers, and other promotional materials for the campaign.',
            priority: 'medium',
            tags: ['MarketingCollateral', 'PrintMaterials'],
          },
        ],
      },
      {
        title: 'Testing',
        tasks: [
          {
            title: 'A/B Testing',
            description: 'Conduct A/B tests to optimize campaign elements and improve performance.',
            priority: 'hight',
            tags: ['ABTesting', 'Optimization'],
          },
          {
            title: 'Monitor Analytics',
            description: 'Track and analyze campaign performance metrics to measure success.',
            priority: 'hight',
            tags: ['Analytics', 'PerformanceMonitoring'],
          },
          {
            title: 'Collect Customer Feedback',
            description: 'Gather feedback from customers to evaluate campaign effectiveness and satisfaction.',
            priority: 'medium',
            tags: ['CustomerFeedback', 'Survey'],
          },
          {
            title: 'Review Ad Spend',
            description: 'Review and analyze ad spend to ensure it aligns with campaign objectives and ROI targets.',
            priority: 'medium',
            tags: ['AdSpend', 'ROIAnalysis'],
          },
          {
            title: 'Test Landing Page Conversion',
            description: 'Test landing page elements and conversion paths to optimize for conversions.',
            priority: 'medium',
            tags: ['ConversionTesting', 'ConversionRateOptimization'],
          },
        ],
      },
      {
        title: 'Done',
        tasks: [
          {
            title: 'Evaluate Campaign Performance',
            description: 'Review campaign performance against goals and objectives.',
            priority: 'hight',
            tags: ['PerformanceEvaluation', 'CampaignAnalysis'],
          },
          {
            title: 'Generate Campaign Report',
            description: 'Compile campaign data and insights into a comprehensive report for stakeholders.',
            priority: 'medium',
            tags: ['CampaignReport', 'DataAnalysis'],
          },
          {
            title: 'Client Presentation',
            description: 'Present campaign results and recommendations to clients or stakeholders.',
            priority: 'medium',
            tags: ['ClientPresentation', 'StakeholderMeeting'],
          },
          {
            title: 'Celebrate Success',
            description: 'Acknowledge and celebrate the successful completion of the campaign.',
            priority: 'low',
            tags: ['Celebration', 'Recognition'],
          },
          {
            title: 'Lessons Learned',
            description: 'Document key learnings and insights from the campaign for future reference.',
            priority: 'medium',
            tags: ['LessonsLearned', 'KnowledgeSharing'],
          },
        ],
      },
    ],
  },
  {
    title: 'Mobile App Development',
    sections: [
      {
        title: 'To Do',
        tasks: [
          {
            title: 'Define App Features',
            description: 'Identify and prioritize key features for the mobile app.',
            priority: 'hight',
            tags: ['FeatureDefinition', 'RequirementGathering'],
          },
          {
            title: 'Create Wireframes',
            description: 'Design wireframes to visualize the layout and flow of the app.',
            priority: 'medium',
            tags: ['Wireframing', 'UIUXDesign'],
          },
          {
            title: 'Set Up Development Environment',
            description: 'Configure development tools and environments for the project.',
            priority: 'medium',
            tags: ['DevelopmentEnvironment', 'Setup'],
          },
          {
            title: 'Develop Backend',
            description: 'Build the backend infrastructure and APIs to support app functionality.',
            priority: 'hight',
            tags: ['BackendDevelopment', 'APIIntegration'],
          },
          {
            title: 'Design UI/UX',
            description: 'Create visually appealing and intuitive user interfaces for the app.',
            priority: 'medium',
            tags: ['UIUXDesign', 'UserExperience'],
          },
        ],
      },
      {
        title: 'In Progress',
        tasks: [
          {
            title: 'Implement Frontend',
            description: 'Code the frontend components and user interface of the mobile app.',
            priority: 'hight',
            tags: ['FrontendDevelopment', 'MobileAppDevelopment'],
          },
          {
            title: 'Integrate Third-Party Services',
            description: 'Incorporate third-party services and APIs for additional app functionality.',
            priority: 'medium',
            tags: ['Integration', 'APIIntegration'],
          },
          {
            title: 'Testing',
            description: 'Conduct thorough testing to ensure app functionality and performance.',
            priority: 'hight',
            tags: ['Testing', 'QualityAssurance'],
          },
          {
            title: 'Optimize for Performance',
            description: 'Optimize app performance to ensure smooth and efficient user experience.',
            priority: 'medium',
            tags: ['PerformanceOptimization', 'MobileOptimization'],
          },
          {
            title: 'Localization',
            description: 'Translate app content and adapt it for different languages and regions.',
            priority: 'medium',
            tags: ['Localization', 'Internationalization'],
          },
        ],
      },
      {
        title: 'Testing',
        tasks: [
          {
            title: 'User Acceptance Testing',
            description: 'Engage stakeholders to test the app and provide feedback.',
            priority: 'medium',
            tags: ['UAT', 'StakeholderFeedback'],
          },
          {
            title: 'Regression Testing',
            description: 'Test app functionality after changes to ensure existing features still work.',
            priority: 'hight',
            tags: ['RegressionTesting', 'QualityAssurance'],
          },
          {
            title: 'Security Testing',
            description: 'Conduct security testing to identify and fix potential vulnerabilities.',
            priority: 'hight',
            tags: ['SecurityTesting', 'Cybersecurity'],
          },
          {
            title: 'Performance Testing',
            description: 'Analyze app performance under various conditions to ensure reliability.',
            priority: 'medium',
            tags: ['PerformanceTesting', 'LoadTesting'],
          },
          {
            title: 'Accessibility Testing',
            description: 'Ensure app accessibility compliance for users with disabilities.',
            priority: 'medium',
            tags: ['AccessibilityTesting', 'WCAGCompliance'],
          },
        ],
      },
      {
        title: 'Done',
        tasks: [
          {
            title: 'App Store Submission',
            description: 'Submit the app to the respective app stores for review and approval.',
            priority: 'hight',
            tags: ['AppStore', 'Submission'],
          },
          {
            title: 'Launch Marketing Campaign',
            description: 'Promote the app launch through marketing channels to attract users.',
            priority: 'medium',
            tags: ['MarketingCampaign', 'AppLaunch'],
          },
          {
            title: 'Client Training',
            description: 'Provide training sessions for clients to manage and update the app.',
            priority: 'medium',
            tags: ['ClientTraining', 'KnowledgeTransfer'],
          },
          {
            title: 'Documentation',
            description: 'Prepare documentation for app usage and maintenance.',
            priority: 'low',
            tags: ['Documentation', 'UserManual'],
          },
          {
            title: 'Project Review',
            description: 'Conduct a project review meeting to gather feedback and lessons learned.',
            priority: 'medium',
            tags: ['ProjectReview', 'LessonsLearned'],
          },
        ],
      },
    ],
  },
  {
    title: 'Content Marketing Strategy',
    sections: [
      {
        title: 'To Do',
        tasks: [
          {
            title: 'Define Content Goals',
            description: 'Identify objectives and KPIs for the content marketing strategy.',
            priority: 'hight',
            tags: ['ContentStrategy', 'GoalSetting'],
          },
          {
            title: 'Audience Research',
            description: 'Analyze target audience demographics, interests, and behavior.',
            priority: 'hight',
            tags: ['AudienceResearch', 'PersonaDevelopment'],
          },
          {
            title: 'Keyword Research',
            description: 'Identify relevant keywords and topics for content creation and SEO.',
            priority: 'medium',
            tags: ['KeywordResearch', 'SEO'],
          },
          {
            title: 'Content Calendar Planning',
            description: 'Create a content calendar outlining topics, formats, and publishing schedule.',
            priority: 'medium',
            tags: ['ContentCalendar', 'Planning'],
          },
          {
            title: 'Content Creation',
            description: 'Write and produce engaging content aligned with the content strategy.',
            priority: 'hight',
            tags: ['ContentCreation', 'Copywriting'],
          },
        ],
      },
      {
        title: 'In Progress',
        tasks: [
          {
            title: 'Content Optimization',
            description: 'Optimize existing content for SEO, readability, and engagement.',
            priority: 'medium',
            tags: ['ContentOptimization', 'SEO'],
          },
          {
            title: 'Social Media Promotion',
            description: 'Promote content across social media channels to increase reach and engagement.',
            priority: 'hight',
            tags: ['SocialMedia', 'ContentPromotion'],
          },
          {
            title: 'Email Marketing Campaign',
            description: 'Develop email campaigns to distribute content and engage with subscribers.',
            priority: 'medium',
            tags: ['EmailMarketing', 'CampaignCreation'],
          },
          {
            title: 'Content Collaboration',
            description: 'Collaborate with influencers or partners for content creation and promotion.',
            priority: 'medium',
            tags: ['Collaboration', 'InfluencerMarketing'],
          },
          {
            title: 'Visual Content Creation',
            description: 'Design graphics, infographics, and videos to complement written content.',
            priority: 'medium',
            tags: ['VisualContent', 'GraphicDesign'],
          },
        ],
      },
      {
        title: 'Testing',
        tasks: [
          {
            title: 'Performance Monitoring',
            description: 'Track content performance metrics and adjust strategies accordingly.',
            priority: 'hight',
            tags: ['PerformanceMonitoring', 'Analytics'],
          },
          {
            title: 'A/B Testing',
            description: 'Conduct A/B tests on content elements to optimize for engagement and conversion.',
            priority: 'hight',
            tags: ['ABTesting', 'Optimization'],
          },
          {
            title: 'Audience Feedback Collection',
            description: 'Gather feedback from the audience to evaluate content effectiveness and relevance.',
            priority: 'medium',
            tags: ['AudienceFeedback', 'Survey'],
          },
          {
            title: 'Social Listening',
            description: 'Monitor social media channels for audience sentiments and trends.',
            priority: 'medium',
            tags: ['SocialListening', 'SentimentAnalysis'],
          },
          {
            title: 'Website Analytics Review',
            description: 'Analyze website analytics to understand content consumption and user behavior.',
            priority: 'medium',
            tags: ['WebsiteAnalytics', 'UserBehavior'],
          },
        ],
      },
      {
        title: 'Done',
        tasks: [
          {
            title: 'Content Distribution',
            description: 'Distribute content through various channels and platforms.',
            priority: 'hight',
            tags: ['ContentDistribution', 'ContentSyndication'],
          },
          {
            title: 'Report Generation',
            description: 'Create reports summarizing content performance and campaign results.',
            priority: 'medium',
            tags: ['ReportGeneration', 'Analytics'],
          },
          {
            title: 'Client Presentation',
            description: 'Present content strategy and campaign results to clients or stakeholders.',
            priority: 'medium',
            tags: ['ClientPresentation', 'StakeholderMeeting'],
          },
          {
            title: 'Celebrate Success',
            description: 'Acknowledge and celebrate successful content campaigns and achievements.',
            priority: 'low',
            tags: ['Celebration', 'Recognition'],
          },
          {
            title: 'Lessons Learned',
            description: 'Document key learnings and insights from content marketing efforts.',
            priority: 'medium',
            tags: ['LessonsLearned', 'KnowledgeSharing'],
          },
        ],
      },
    ],
  },
  {
    title: 'Product Launch',
    sections: [
      {
        title: 'To Do',
        tasks: [
          {
            title: 'Define Product Features',
            description: 'Identify and prioritize key features for the product.',
            priority: 'hight',
            tags: ['FeatureDefinition', 'RequirementGathering'],
          },
          {
            title: 'Market Research',
            description: 'Analyze market trends, competitors, and customer needs.',
            priority: 'hight',
            tags: ['MarketResearch', 'CompetitiveAnalysis'],
          },
          {
            title: 'Create Marketing Plan',
            description: 'Develop a comprehensive marketing strategy to promote the product.',
            priority: 'medium',
            tags: ['MarketingPlan', 'ProductPromotion'],
          },
          {
            title: 'Design Product Packaging',
            description: 'Create visually appealing and informative packaging for the product.',
            priority: 'medium',
            tags: ['PackagingDesign', 'ProductPresentation'],
          },
          {
            title: 'Set Launch Date',
            description: 'Determine the official launch date for the product.',
            priority: 'medium',
            tags: ['LaunchDate', 'Planning'],
          },
        ],
      },
      {
        title: 'In Progress',
        tasks: [
          {
            title: 'Product Development',
            description: 'Design and develop the product according to specifications.',
            priority: 'hight',
            tags: ['ProductDevelopment', 'Prototyping'],
          },
          {
            title: 'Create Marketing Materials',
            description: 'Produce promotional materials such as videos, ads, and brochures.',
            priority: 'medium',
            tags: ['MarketingMaterials', 'ContentCreation'],
          },
          {
            title: 'Setup Sales Channels',
            description: 'Establish distribution channels and retail partners for the product.',
            priority: 'hight',
            tags: ['SalesChannels', 'Distribution'],
          },
          {
            title: 'Create Product Documentation',
            description: 'Prepare user manuals and guides for the product.',
            priority: 'medium',
            tags: ['Documentation', 'UserManual'],
          },
          {
            title: 'Finalize Pricing Strategy',
            description: 'Determine the pricing strategy and set product prices.',
            priority: 'medium',
            tags: ['PricingStrategy', 'ProductPricing'],
          },
        ],
      },
      {
        title: 'Testing',
        tasks: [
          {
            title: 'Quality Assurance',
            description: 'Conduct thorough testing to ensure product quality and functionality.',
            priority: 'hight',
            tags: ['QualityAssurance', 'Testing'],
          },
          {
            title: 'User Acceptance Testing',
            description: 'Engage stakeholders to test the product and provide feedback.',
            priority: 'medium',
            tags: ['UAT', 'StakeholderFeedback'],
          },
          {
            title: 'Packaging Testing',
            description: 'Evaluate packaging design and materials for durability and appeal.',
            priority: 'medium',
            tags: ['PackagingTesting', 'QualityAssurance'],
          },
          {
            title: 'Pricing Validation',
            description: 'Validate pricing strategy through market research and customer feedback.',
            priority: 'medium',
            tags: ['PricingValidation', 'MarketResearch'],
          },
          {
            title: 'Market Testing',
            description: 'Conduct test launches or pilot programs to gauge market response.',
            priority: 'medium',
            tags: ['MarketTesting', 'LaunchEvaluation'],
          },
        ],
      },
      {
        title: 'Done',
        tasks: [
          {
            title: 'Product Launch Event',
            description: 'Organize and execute a launch event to unveil the product to the public.',
            priority: 'hight',
            tags: ['LaunchEvent', 'ProductIntroduction'],
          },
          {
            title: 'Market Rollout',
            description: 'Initiate full-scale distribution and marketing of the product.',
            priority: 'medium',
            tags: ['MarketRollout', 'Distribution'],
          },
          {
            title: 'Customer Support Setup',
            description: 'Establish customer support channels and resources for product assistance.',
            priority: 'medium',
            tags: ['CustomerSupport', 'AfterSalesService'],
          },
          {
            title: 'Post-Launch Evaluation',
            description: 'Assess product performance and market reception post-launch.',
            priority: 'medium',
            tags: ['PostLaunchEvaluation', 'MarketFeedback'],
          },
          {
            title: 'Lessons Learned',
            description: 'Document key insights and learnings from the product launch process.',
            priority: 'medium',
            tags: ['LessonsLearned', 'KnowledgeSharing'],
          },
        ],
      },
    ],
  },
  {
    title: 'Event Planning',
    sections: [
      {
        title: 'To Do',
        tasks: [
          {
            title: 'Define Event Objectives',
            description: 'Identify goals and objectives for the event.',
            priority: 'hight',
            tags: ['EventObjectives', 'GoalSetting'],
          },
          {
            title: 'Select Venue',
            description: 'Research and choose a suitable venue for the event.',
            priority: 'hight',
            tags: ['VenueSelection', 'LocationScouting'],
          },
          {
            title: 'Create Event Budget',
            description: 'Outline budgetary requirements for the event.',
            priority: 'medium',
            tags: ['Budgeting', 'FinancialPlanning'],
          },
          {
            title: 'Design Event Program',
            description: 'Plan the schedule and activities for the event.',
            priority: 'medium',
            tags: ['EventProgram', 'AgendaPlanning'],
          },
          {
            title: 'Identify Key Speakers',
            description: 'Select and invite speakers or presenters for the event.',
            priority: 'medium',
            tags: ['KeySpeakers', 'SpeakerSelection'],
          },
        ],
      },
      {
        title: 'In Progress',
        tasks: [
          {
            title: 'Event Promotion',
            description: 'Market and promote the event to attract attendees.',
            priority: 'hight',
            tags: ['EventPromotion', 'Marketing'],
          },
          {
            title: 'Manage Registrations',
            description: 'Handle event registrations and attendee inquiries.',
            priority: 'medium',
            tags: ['RegistrationManagement', 'AttendeeServices'],
          },
          {
            title: 'Coordinate Logistics',
            description: 'Arrange logistics such as catering, transportation, and equipment.',
            priority: 'hight',
            tags: ['LogisticsCoordination', 'EventManagement'],
          },
          {
            title: 'Finalize Event Materials',
            description: 'Prepare materials such as handouts, name tags, and signage.',
            priority: 'medium',
            tags: ['EventMaterials', 'Collateral'],
          },
          {
            title: 'Confirm Vendor Contracts',
            description: 'Finalize contracts and agreements with event vendors and suppliers.',
            priority: 'medium',
            tags: ['VendorContracts', 'SupplierManagement'],
          },
        ],
      },
      {
        title: 'Testing',
        tasks: [
          {
            title: 'Venue Inspection',
            description: 'Conduct site visits to ensure venue readiness and suitability.',
            priority: 'hight',
            tags: ['VenueInspection', 'SiteVisit'],
          },
          {
            title: 'Technical Setup Testing',
            description: 'Test audiovisual equipment and technical setups for the event.',
            priority: 'medium',
            tags: ['TechnicalSetup', 'AVTesting'],
          },
          {
            title: 'Run-through Rehearsals',
            description: 'Practice event program and logistics with event staff and speakers.',
            priority: 'medium',
            tags: ['Rehearsals', 'EventRunthrough'],
          },
          {
            title: 'Registration System Testing',
            description: 'Test event registration systems and check-in procedures.',
            priority: 'medium',
            tags: ['RegistrationSystem', 'CheckIn'],
          },
          {
            title: 'Emergency Response Plan',
            description: 'Review and confirm emergency response procedures for the event.',
            priority: 'medium',
            tags: ['EmergencyPlan', 'Safety'],
          },
        ],
      },
      {
        title: 'Done',
        tasks: [
          {
            title: 'Execute Event',
            description: 'Host and manage the event according to the planned program.',
            priority: 'hight',
            tags: ['EventExecution', 'EventManagement'],
          },
          {
            title: 'Event Follow-up',
            description: 'Send post-event communications and gather feedback from attendees.',
            priority: 'medium',
            tags: ['FollowUp', 'FeedbackCollection'],
          },
          {
            title: 'Financial Review',
            description: 'Review event expenses and reconcile budgetary allocations.',
            priority: 'medium',
            tags: ['FinancialReview', 'BudgetAnalysis'],
          },
          {
            title: 'Event Debrief',
            description: 'Conduct a post-event debriefing session to evaluate successes and areas for improvement.',
            priority: 'medium',
            tags: ['Debrief', 'LessonsLearned'],
          },
          {
            title: 'Celebrate Success',
            description: 'Acknowledge and celebrate the successful execution of the event.',
            priority: 'low',
            tags: ['Celebration', 'Recognition'],
          },
        ],
      },
    ],
  },
  {
    title: 'Agile Software Development',
    sections: [
      {
        title: 'Backlog',
        tasks: [
          {
            title: 'Gather User Stories',
            description: 'Collect user requirements and stories for upcoming sprints.',
            priority: 'hight',
            tags: ['UserStories', 'RequirementGathering'],
          },
          {
            title: 'Estimate User Stories',
            description: 'Estimate the effort required to complete user stories.',
            priority: 'medium',
            tags: ['StoryEstimation', 'PlanningPoker'],
          },
          {
            title: 'Prioritize Backlog',
            description: 'Rank user stories based on priority for sprint planning.',
            priority: 'hight',
            tags: ['BacklogPrioritization', 'SprintPlanning'],
          },
          {
            title: 'Refine User Stories',
            description: 'Break down user stories into smaller tasks and clarify requirements.',
            priority: 'medium',
            tags: ['StoryRefinement', 'TaskBreakdown'],
          },
          {
            title: 'Create Sprint Backlog',
            description: 'Select user stories for the upcoming sprint and create a sprint backlog.',
            priority: 'medium',
            tags: ['SprintBacklog', 'SprintPlanning'],
          },
        ],
      },
      {
        title: 'Sprint Planning',
        tasks: [
          {
            title: 'Sprint Planning Meeting',
            description: 'Hold a meeting to plan and commit to the sprint backlog.',
            priority: 'hight',
            tags: ['SprintPlanningMeeting', 'Scrum'],
          },
          {
            title: 'Assign Tasks',
            description: 'Assign tasks to team members based on skillset and availability.',
            priority: 'medium',
            tags: ['TaskAssignment', 'TeamCollaboration'],
          },
          {
            title: 'Define Acceptance Criteria',
            description: 'Clarify acceptance criteria for user stories and tasks.',
            priority: 'hight',
            tags: ['AcceptanceCriteria', 'QualityAssurance'],
          },
          {
            title: 'Estimate Sprint Effort',
            description: 'Estimate the overall effort required to complete the sprint.',
            priority: 'medium',
            tags: ['SprintEstimation', 'Velocity'],
          },
          {
            title: 'Kick-off Sprint',
            description: 'Officially start the sprint and begin work on sprint backlog items.',
            priority: 'hight',
            tags: ['SprintKickoff', 'AgileDevelopment'],
          },
        ],
      },
      {
        title: 'In Progress',
        tasks: [
          {
            title: 'Development',
            description: 'Code and implement features according to the sprint backlog.',
            priority: 'hight',
            tags: ['Development', 'Coding'],
          },
          {
            title: 'Code Review',
            description: 'Review code changes and provide feedback to maintain code quality.',
            priority: 'medium',
            tags: ['CodeReview', 'QualityAssurance'],
          },
          {
            title: 'Testing',
            description: 'Conduct unit tests and integration tests to ensure feature functionality.',
            priority: 'hight',
            tags: ['Testing', 'QualityAssurance'],
          },
          {
            title: 'Daily Standup',
            description: 'Hold daily meetings to discuss progress, challenges, and plans for the day.',
            priority: 'hight',
            tags: ['DailyStandup', 'Scrum'],
          },
          {
            title: 'Refactor Code',
            description: 'Improve code quality and maintainability through refactoring.',
            priority: 'medium',
            tags: ['Refactoring', 'CodeQuality'],
          },
        ],
      },
      {
        title: 'Testing',
        tasks: [
          {
            title: 'Regression Testing',
            description: 'Ensure existing functionality remains intact after new changes.',
            priority: 'medium',
            tags: ['RegressionTesting', 'QualityAssurance'],
          },
          {
            title: 'User Acceptance Testing',
            description: 'Validate features with stakeholders to ensure they meet user expectations.',
            priority: 'hight',
            tags: ['UAT', 'StakeholderFeedback'],
          },
          {
            title: 'Performance Testing',
            description: 'Analyze and optimize system performance under load.',
            priority: 'medium',
            tags: ['PerformanceTesting', 'LoadTesting'],
          },
          {
            title: 'Security Testing',
            description: 'Identify and mitigate potential security vulnerabilities.',
            priority: 'medium',
            tags: ['SecurityTesting', 'Cybersecurity'],
          },
          {
            title: 'Accessibility Testing',
            description: 'Ensure the application is accessible to users with disabilities.',
            priority: 'medium',
            tags: ['AccessibilityTesting', 'WCAGCompliance'],
          },
        ],
      },
      {
        title: 'Done',
        tasks: [
          {
            title: 'Sprint Review',
            description: 'Demo completed features to stakeholders and gather feedback.',
            priority: 'hight',
            tags: ['SprintReview', 'StakeholderDemo'],
          },
          {
            title: 'Sprint Retrospective',
            description: 'Reflect on the sprint and identify areas for improvement.',
            priority: 'medium',
            tags: ['Retrospective', 'ContinuousImprovement'],
          },
          {
            title: 'Update Documentation',
            description: 'Update documentation and user manuals with new feature information.',
            priority: 'medium',
            tags: ['Documentation', 'KnowledgeBase'],
          },
          {
            title: 'Deploy to Production',
            description: 'Release new features to production and make them available to users.',
            priority: 'hight',
            tags: ['Deployment', 'ReleaseManagement'],
          },
          {
            title: 'Celebrate Success',
            description: 'Acknowledge team achievements and celebrate the completion of the sprint.',
            priority: 'low',
            tags: ['Celebration', 'Recognition'],
          },
        ],
      },
    ],
  },
];

module.exports = {
  projects,
};
