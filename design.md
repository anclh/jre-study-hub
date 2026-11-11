# JRE Study Hub design

The hub is a bilingual study workspace for Hong Kong’s Joint Recruitment Examination. The homepage gives Q1 and Q2 equal weight. Inside each module, the most common study action leads the screen.

## Foundations

- Shared palette and type live in [study-theme.css](docs/shell/study-theme.css). Use jade for primary actions and selected states, light paper for the workspace, and a rule for boundaries.
- Use the display face for the page title and paper numbers. Use the body face for instructions, answers, filters, and other controls.
- Cap the desktop measure, maintain a clear reading order on mobile, and keep keyboard focus visible. Preserve visible content when a browser requests reduced motion.
- The six hub destinations share [tabbar.css](docs/shell/tabbar.css). Module tabs remain in the module and keep their existing URL destinations and state.

## Study screens

- English Q1 and Chinese Q2 share [exam workspace styles](docs/shared/exam-workspace.css). Align their paper headings and section navigation. Let each paper’s content determine its working layout.
- Policy and vocabulary need prominent search, legible cards, and a separate study view. Maintain the language, filter, and saved-card controls.
- The bureaux directory keeps the bureau name, responsibilities, policies, and implementing agencies in the same order in every record.
