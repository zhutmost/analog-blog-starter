export { news2026 } from "./news-2026"
export { news2025 } from "./news-2025"
export { news2024 } from "./news-2024"

import { news2024 } from "./news-2024"
import { news2025 } from "./news-2025"
import { news2026 } from "./news-2026"

const news = [...news2026, ...news2025, ...news2024]
export { news }
