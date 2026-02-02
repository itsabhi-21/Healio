import React from 'react';
import WorkHero from '../components/works/WorkHero';
import HowSteps from '../components/works/HowSteps';
import HowTrust from '../components/works/HowTrust';
import HowCTA from '../components/works/HowCTA';

export default function HowitWorks() {
  return (
    <div className='bg-linear-to-br from-blue-50 to-white w-full'>
        <WorkHero/>
        <HowSteps/>
        <HowTrust/>
        <HowCTA/>
    </div>
  );
}