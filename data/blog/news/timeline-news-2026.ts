import type { TimelineNewsList } from '@/components/common/timeline'

const timelineNews2026: TimelineNewsList = [
  {
    date: new Date('2026-03-28'),
    title:
      'Our paper “GauTracer” is accepted by ISCA 2026. Looking forward to sharing our work at Raleigh, North Carolina!',
    description:
      'GauTracer fully integrates Gaussian primitives into the GPU Ray Tracer pipeline, eliminating software shader invocations.',
  },
  {
    date: new Date('2026-02-13'),
    title: 'Our paper “SpikeLet” was accepted by TCAD.',
    description:
      'This paper presents SpikeLet, a event-driven spatial-temporal-parallel multichiplet neuromorphic system tailored for large-scale SNNs.',
  },
  {
    date: new Date('2026-01-20'),
    title: 'Our paper “CIM-Pruner” is accepted by ISCAS 2026.',
    description:
      'This paper demonstrates a Compute-in-Memory macro design supporting in-memory token merging and pruning for Vision-Language Models.',
  },
]

export default timelineNews2026
