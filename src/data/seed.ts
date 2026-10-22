import type { SiteContent } from './types'

export const seedContent: SiteContent = {
  site: {
    programEmail: 'robonatickredhawks@gmail.com',
    newsletterSignupUrl: 'https://forms.gle/cRVqiHK3hPo1Tb1LA',
    ftcUrl: 'https://www.firstinspires.org/robotics/ftc',
  },
  teams: [
    { number: '3737', name: 'RedHawks', level: 'Varsity' },
    { number: '5436', name: 'Cyber Hawks', level: 'JV' },
    { number: '6032', name: 'Lightning Hawks', level: 'Freshman' },
  ],
  events: [],
  support: [
    { name: 'MathWorks', kind: 'grant', status: 'past' },
    { name: 'Gene Haas Foundation', kind: 'grant', status: 'past' },
    { name: 'Natick Educational Foundation', kind: 'grant', status: 'past' },
    { name: 'Natick Cultural Council', kind: 'other', status: 'past' },
    { name: 'Home Depot', kind: 'other', status: 'past' },
  ],
  outreach: [
    {
      name: 'STEM at the senior center',
      description:
        'Students have volunteered to share hands-on STEM activities with the community.',
      status: 'reported',
    },
    {
      name: 'Design reviews with MathWorks',
      description: 'Students have taken part in design reviews with engineering professionals.',
      status: 'reported',
    },
    {
      name: 'Natick Days',
      description: 'The program has hosted a community booth at Natick Days.',
      status: 'reported',
    },
    {
      name: 'Middle school visits',
      description: 'Presentations at both Natick middle schools have been planned.',
      status: 'planned',
    },
  ],
  mentors: [],
}
