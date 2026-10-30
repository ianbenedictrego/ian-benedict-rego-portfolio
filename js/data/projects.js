/* ==========================================================================
   PROJECTS

   TO ADD A PROJECT: copy a block inside `items`, edit it, and set `cover`
   to the id of an animation registered in js/animations/covers/
   (see README "Adding a cover animation"). Leave `cover` out for no cover.

   Fields (normal project)
     id          unique, lowercase-with-dashes
     title       card heading
     categories  filter keys from `categories` below (a project can have several)
     tags        tech tags on the card
     github      repo / link for the GitHub button (omit to hide the button)
     details     paragraphs shown in the "View more" pop-up
     cover       id of the cover animation

   A project with `featured: true` is shown as the large card above the grid
   (use summary / bullets / stats / meta instead of `details`).
   ========================================================================== */
Portfolio.data.projects = {
  // Filter chips, in this order. The numbers on the chips are counted automatically.
  categories: [
    { key: "agents", label: "Agents" },
    { key: "rag", label: "RAG" },
    { key: "eval", label: "Evaluation" },
    { key: "nlp", label: "NLP" },
    { key: "data", label: "Data science" },
    { key: "research", label: "Research" },
  ],

  items: [
    // ------------------------------------------------------------ FEATURED
    {
      id: "research-project",
      featured: true,
      categories: ["research"],
      badge: "Featured",
      meta: "Research project · Autonomous Multisensor System Labs",
      title:
        "Learning Multiple Interacting Motion Models to Predict Maritime Vessel Trajectories",
      summary:
        "Predicting where a vessel will be next from AIS trajectory data. A JAX-based tracker combines a six-state motion model with Kalman filtering, and learns the motion parameters of each vessel instead of assuming one setting for all.",
      bullets: [
        "JAX-based maritime vessel tracking system built on a six-state motion model and Kalman filtering.",
        "AIS trajectory data used to learn vessel-specific motion parameters and improve trajectory prediction.",
        "Exploring Interacting Multiple Model (IMM) filtering, which weighs several motion models at once.",
      ],
      tags: ["JAX", "Kalman filtering", "IMM", "AIS data"],
      stats: [
        { value: "6", label: "states in the vessel motion model" },
        {
          value: "AIS",
          label: "trajectory data used to learn vessel-specific parameters",
        },
        {
          value: "IMM",
          label: "filtering being explored across several motion models",
        },
      ],
      cover: "vessel-tracking",
    },

    // ---------------------------------------------------------------- GRID
    {
      id: "agentic-router",
      categories: ["agents", "eval"],
      title: "Agentic LLM Router",
      tags: [
        "LangGraph",
        "Llama",
        "Gemini",
        "FastAPI",
        "Redis",
        "LLM-as-a-Judge",
        "Pydantic",
      ],
      github: "https://github.com/ianbenedictrego/Agentic-LLM-Router",
      details: [
        "An agentic GenAI routing service built with LangGraph that dynamically routes queries across multiple LLMs based on user intent and query complexity.",
        "The modular workflow uses structured outputs, conditional routing, model fallbacks and LLM-as-a-Judge evaluation to assess routing and response quality. Redis-based TTL caching reduces redundant LLM calls, and the pipeline is deployed as a FastAPI service with automatically generated Swagger documentation.",
      ],
      cover: "agentic-router",
    },
    {
      id: "enterprise-rag",
      categories: ["rag", "eval"],
      title: "Enterprise GenAI Knowledge Retrieval Platform",
      tags: ["FAISS", "BM25", "RRF", "Cross-encoder", "Embeddings", "Python"],
      github:
        "https://github.com/ianbenedictrego/Intelligent-Document-Platform-for-Enterprise-Knowledge-Retrieval",
      details: [
        "A hybrid enterprise RAG pipeline combining dense retrieval, BM25 and Reciprocal Rank Fusion for multi-document knowledge retrieval.",
        "Cross-encoder reranking and metadata-aware indexing improve retrieval relevance and answer grounding. Automated PDF ingestion, semantic chunking, embedding generation and persistent FAISS indexing make it an end-to-end knowledge platform.",
      ],
      cover: "hybrid-retrieval",
    },
    {
      id: "bias-detection",
      categories: ["nlp"],
      title: "Bias Detection and Fairness Auditing Platform",
      tags: ["NLP", "LLM rewriting", "Streamlit", "Python"],
      github:
        "https://github.com/ianbenedictrego/Bias-Detection-and-Fairness-Auditing-Platform",
      details: [
        "An NLP and generative AI pipeline for demographic-bias detection and LLM-assisted content rewriting.",
        "It evaluates subgroup-level bias and semantic similarity, achieving up to 18% fairness improvement while preserving 80% semantic similarity. Results are delivered through automated reports and interactive Streamlit visualizations.",
      ],
      cover: "nlp-bias",
    },
    {
      id: "roadlens",
      categories: ["data"],
      title: "RoadLens: Collision Severity and Hotspot Analysis",
      tags: [
        "Spatiotemporal analysis",
        "Severity classification",
        "Forecasting",
        "Geospatial",
      ],
      github: "https://github.com/ianbenedictrego",
      details: [
        "A data science pipeline that integrates and preprocesses UK road collision, vehicle and casualty datasets to study collision severity and persistent accident hotspots over space and time.",
        "Machine learning models classify severity and forecast future high-risk locations, testing what vehicle and casualty characteristics add. Geospatial hotspot analysis and road-user injury prioritisation compare safety priorities for pedestrians, cyclists and motorcyclists. This project is in progress.",
      ],
      cover: "road-hotspots",
    },
  ],
};
