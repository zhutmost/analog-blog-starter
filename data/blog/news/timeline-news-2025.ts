import type { TimelineNewsList } from '@/components/timeline'

const timelineNews2025: TimelineNewsList = [
  {
    date: new Date('2025-06-16'),
    title: 'Our 2 papers about HW/SW-codesign for MoE are accepted by DAC 2025.',
    description: 'Looking forward to the presentation in San Francisco!',
  },
  {
    date: new Date('2025-05-16'),
    title: 'I became an assistant professor at Fudan University.',
    description:
      "Still focusing on AI chips for Robotics/LLM/.... Welcome to apply for doctoral and master's degrees!",
  },
  {
    date: new Date('2025-05-15'),
    title: 'Our paper “A 22-nm 109.3-to-249.5-TFLOPS/W Outlier-Aware ...” was accepted by JSSC.',
    description:
      'This paper proposes OA-CIM, a 22nm SRAM-based Compute-in-Memory macro for LLMs. It supports mixed-precision (INT4+FP16) MACs',
  },
  {
    date: new Date('2025-02-16'),
    title:
      'Our paper “SHINSAI: A 586mm2 Reusable Active TSV-Interposer ...” appeared on ISSCC 2025.',
    description:
      'SHINSAI (芯斋) is a 586mm2 reusable active TSV interposer with microbump-level programmable interconnect fabric and 512Mb 3D underdeck SRAM memory.',
  },
]

export default timelineNews2025
