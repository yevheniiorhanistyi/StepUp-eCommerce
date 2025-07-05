'use client';

import { Button } from '../ui/button';
import Link from 'next/link';
import { Github, Linkedin } from 'lucide-react';
import teamMembers from './teamData';
import TeamContributionModal from './TeamContributionModal';
import { useState } from 'react';

const AboutUsPage = (): JSX.Element => {
  const [modalOpenIndex, setModalOpenIndex] = useState<number | null>(null);

  return (
    <section className="w-full max-w-[1440px] mx-auto">
      <div className="mb-10">
        <h1 className="uppercase text-left text-md text-gray-500">Our team</h1>
        <h2 className="text-3xl font-bold capitalize text-left">Get to know us</h2>
      </div>

      <div className="space-y-10">
        {teamMembers.map((member, index) => (
          <div key={index} className="flex flex-col md:flex-row items-center gap-4 md:gap-10">
            <div className="flex-shrink-0">
              <img
                loading="lazy"
                width={160}
                height={160}
                className="rounded-full object-cover"
                src={member.image}
                alt={member.name}
              />
            </div>

            <div className="flex-1 text-center md:text-left">
              <h3 className="text-xl font-semibold uppercase">{member.name}</h3>
              <p className="text-sm text-gray-500">{member.role}</p>
              <p className="mt-2 text-gray-700">{member.bio}</p>

              <div className="mt-2 flex justify-center md:justify-start gap-2 text-gray-600">
                <a
                  href={member.linkedin}
                  aria-label={`LinkedIn — ${member.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black hover:text-gray-600 transition"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href={member.github}
                  aria-label={`GitHub — ${member.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black hover:text-gray-600 transition"
                >
                  <Github className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div>
              <Button className="cursor-pointer" onClick={() => setModalOpenIndex(index)}>
                Contribution
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-20 text-center">
        <div className="w-24 h-px bg-black mx-auto mb-2" />
        <p className="text-sm inline-flex items-center gap-2">
          Built as part of a training project at
          <Link
            href="https://rs.school/"
            target="_blank"
            rel="noopener noreferrer"
            className="relative w-[25px] h-[25px]"
          >
            <img
              loading="lazy"
              width={25}
              height={25}
              className="hover:opacity-80 transition-opacity"
              src="/rsschool.png"
              alt="RsSchool Logo"
            />
          </Link>
        </p>
      </div>

      {modalOpenIndex !== null && (
        <TeamContributionModal
          isOpen={modalOpenIndex !== null}
          onOpen={() => setModalOpenIndex(null)}
          onClose={() => setModalOpenIndex(null)}
          contributions={teamMembers[modalOpenIndex].contributions}
        />
      )}
    </section>
  );
};
export default AboutUsPage;
