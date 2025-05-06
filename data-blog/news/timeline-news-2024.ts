import { TimelineItemProps } from '@/components/timeline'

const timelineNews2024: TimelineItemProps[] = [
  {
    date: new Date('2024-11-07'),
    title:
      'Our paper “A Real-Time Optical-Flow-based SLAM ...” won the Distinguished Design Award on A-SSCC 2024!',
    description:
      'We presented and demonstrated Xiliu, an optical-flow-based SLAM accelerator on FPGA. It exploits the similarity and sparsity of optical flow to achieve real-time performance.',
    icons: {
      // PDF: { icon: 'IconFileTypePdf', href: 'https://arxiv.org/pdf/2307.06962v1' },
    },
  },
  {
    date: new Date('2024-11-01'),
    title: 'Our paper “GauSPU: 3D Gaussian Splatting Processor ...” appeared on MICRO 2024.',
    description:
      'GauSPU is a HW/SW-cooptimized GPU extension aiming to realize real-time pose tracking in 3D Gaussian Spltting-based SLAM systems. ',
    icons: {
      // PDF: { icon: 'IconFileTypePdf', href: '/publications/2024 MICRO GauSPU.pdf' },
    },
  },
  {
    date: new Date('2024-10-25'),
    title: 'Our paper “ST-BPTT: a Memory-Efficient BPTT SNN Training ...” appeared on BioCAS 2024.',
    description:
      'This work reduces the memory footprint of BPTT-based SNN training by cutting off the back-propagation paths of the timesteps with low significance.',
    icons: {},
  },
  {
    date: new Date('2024-05-14'),
    title: 'Our 2 Compute-in-Memory papers appeared on ISCAS 2024.',
    description:
      'We presented two works, a Logarithmic FP CIM macro and a LUT-based CIM macro. The latter, Trident-CIM, was invited to transfer to TCAS-II.',
    icons: {
      // 'LogFP-CIM PDF': { icon: 'IconFileTypePdf', href: '/publications/2025 ISCAS LogFP-CIM.pdf' },
      // 'LogFP-CIM IEEExplore': {
      //   icon: 'IconLink',
      //   href: 'https://doi.org/10.1109/ISCAS58744.2024.10558433',
      // },
      // 'Trident-CIM PDF': {
      //   icon: 'IconFileTypePdf',
      //   href: '/publications/2024 TCAS-II Trident-CIM.pdf',
      // },
      // 'Trident-CIM IEEExplore': {
      //   icon: 'IconLink',
      //   href: 'https://doi.org/10.1109/TCSII.2024.3376257',
      // },
    },
  },
  {
    date: new Date('2024-05-14'),
    title: 'Our paper “SLAM-CIM: A Visual SLAM Backend Processor ...” is accepted by JSSC.',
    description:
      'We propose SLAM-CIM, a Compute-in-Memory based visual SLAM backend processor for edge robotics. It features SRAM-based FP16 digital CIM macros supporting both MAC and linear solving.',
    icons: {
      // PDF: { icon: 'IconFileTypePdf', href: '/publications/2024 JSSC SLAM-CIM.pdf' },
      // IEEExplore: { icon: 'IconLink', href: 'https://doi.org/10.1109/JSSC.2024.3402808' },
    },
  },
]

export default timelineNews2024
