import { Button } from '../ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { Github, Linkedin } from 'lucide-react';

const teamMembers = [
  {
    name: 'Yevhenii Orhanistyi',
    role: 'Frontend Developer & Team Lead',
    bio: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas.',
    image: '/images/members/Yevhenii-Orhanistyi.jpg',
    github: 'https://github.com/yevheniiorhanistyi',
    linkedin: 'https://www.linkedin.com/in/yevhenii-orhanistyi-819094224/'
  },
  {
    name: 'Dzmitry Drevich',
    role: 'Frontend Developer & Scrum Master',
    bio: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas.',
    image: '/images/members/Dzmitry-Drevich.jpg',
    github: 'https://github.com/rasimaru',
    linkedin: 'https://www.linkedin.com/in/dzmitrydrevich'
  },
  {
    name: 'Marharyta Shyshkavets',
    role: 'Frontend Developer & UI Designer',
    bio: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas.',
    image: '/images/members/Marharyta-Shyshkavets.jpg',
    github: 'https://github.com/margomint',
    linkedin: 'https://www.linkedin.com/in/marharyta-shyshkavets-18b866363/'
  }
];

const AboutUsPage = (): JSX.Element => {
  return (
    <section className="w-full max-w-7xl mx-auto">
      <div className="mb-10">
        <h1 className="uppercase text-left text-md text-gray-500">Our team</h1>
        <h2 className="text-3xl font-bold capitalize text-left">Get to know us</h2>
      </div>

      <div className="space-y-10">
        {teamMembers.map((member, index) => (
          <div key={index} className="flex flex-col md:flex-row items-center gap-4 md:gap-10">
            <div className="flex-shrink-0">
              <Image
                src={member.image}
                alt={member.name}
                width={160}
                height={160}
                className="rounded-full object-cover"
              />
            </div>

            <div className="flex-1 text-center md:text-left">
              <h3 className="text-xl font-semibold uppercase">{member.name}</h3>
              <p className="text-sm text-gray-500">{member.role}</p>
              <p className="mt-2 text-gray-700">{member.bio}</p>

              <div className="mt-2 flex justify-center md:justify-start gap-2 text-gray-600">
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black hover:text-gray-600 transition"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black hover:text-gray-600 transition"
                >
                  <Github className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div>
              <Button className="cursor-pointer">Contribution</Button>
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
            <Image
              src="/rsschool.png"
              alt="RsSchool Logo"
              fill
              sizes="25px"
              title="Rolling Scopes School"
              className="hover:opacity-80 transition-opacity"
            />
          </Link>
        </p>
      </div>
    </section>
  );
};
export default AboutUsPage;
