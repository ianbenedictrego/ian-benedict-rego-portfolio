/* ==========================================================================
   SKILLS — one block per group.

   TO ADD A SKILL:        add a string to a group's `tags` list.
   TO ADD A SKILL GROUP:  copy a { title, tags } block and edit it.
   If the number of groups is odd, the last group automatically spans the
   full width (like "Cloud & Workflow" in the design).
   ========================================================================== */
Portfolio.data.skills = [
  { title: 'Generative AI',        tags: ['LangGraph', 'LangChain', 'RAG', 'FAISS', 'Vector DBs'] },
  { title: 'ML & Deep Learning',   tags: ['PyTorch', 'JAX', 'scikit-learn', 'NumPy', 'pandas', 'Matplotlib'] },
  { title: 'Backend',              tags: ['Python', 'Java', 'FastAPI', 'Pydantic', 'REST APIs', 'Redis', 'SQL'] },
  { title: 'Evaluation & Testing', tags: ['LLM-as-a-Judge', 'LangSmith', 'Selenium', 'TestNG'] },
  { title: 'Cloud & Workflow',     tags: ['AWS', 'Docker', 'Linux', 'Git', 'Scrum'] }
];
