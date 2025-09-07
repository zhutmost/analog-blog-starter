import type { TimelineNewsList } from '@/components/timeline'

const timelineNews2025: TimelineNewsList = [
  {
    date: new Date('2025-08-10'),
    title:
      'Our paper about “VLA-driven Manipulator on FPGA” is accepted by A-SSCC 2025 and selected as a Highlight paper.',
    description:
      'We will demonstrate the robotic arm driven by our FPGA accelerator at the Demonstration Session. We look forward to seeing you in Korea.',
  },
  {
    date: new Date('2025-07-01'),
    title: 'Our paper about “Pattern-based Rendering Engine for 3DGS” is accepted by ICCAD 2025.',
    description:
      'GauRPE is a SW/HW co-design that performs 3DGS rasterization via pattern matching. Looking forward to the presentation in Munich.',
  },
  {
    date: new Date('2025-05-16'),
    title: 'I became an tenure-track Assistant Professor at Fudan University.',
    description:
      "Still focusing on AI chips for Robotics/LLM/.... Welcome to apply for doctoral and master's degrees!",
  },
  {
    date: new Date('2025-05-15'),
    title: 'Our paper “A 22-nm 109.3-to-249.5-TFLOPS/W Outlier-Aware ...” was accepted by JSSC.',
    description:
      'This paper proposes OA-CIM, a 22nm SRAM-based Compute-in-Memory macro for LLMs. It supports mixed-precision (INT4+FP16) MACs optimized for outlier-aware LLM deployment.',
  },
  {
    date: new Date('2025-02-16'),
    title: 'Our 2 papers about “HW/SW-codesign for MoE” are accepted by DAC 2025.',
    description:
      'PIMoE proposes a workload offloading strategy for MoE  deployment on NPU-PIM heterogeneous systems, while Hydra addresses the load imbalance challenge among MoE experts in multi-chiplet integrated chips.',
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
