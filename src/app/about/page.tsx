// About.tsx

import React from 'react';

interface Person {
  name: string;
  id: string;
  email: string;
  experience: string;
  skills: string[];
  responsibilities: string[];
}

const people: Person[] = [
  {
    name: 'Anwaruddin Mohammad',
    id: 'n01553149',
    email: 'n01553149@humber.ca',
    experience: 'Worked at TCS for 3 years.',
    skills: ['Java', 'Spring', 'SQL'],
    responsibilities: [
      'Develop and maintain Java applications.',
      'Collaborate with team members on project tasks.',
      'Design and implement database solutions.',
      'Conduct code reviews for team members.',
    ],
  },
  {
    name: 'Sibi Saraswathi Mohan',
    id: 'n01539502',
    email: 'n01539502@humber.ca',
    experience: 'Worked at Lightcast for 1.5 years.',
    skills: ['JavaScript', 'React', 'Node.js'],
    responsibilities: [
      'Build and optimize web applications using React.',
      'Collaborate with UI/UX designers for front-end development.',
      'Implement server-side logic using Node.js.',
      'Troubleshoot and debug application issues.',
    ],
  },
  {
    name: 'Garima Wadhwa',
    id: 'n01552997',
    email: 'n01552997@humber.ca',
    experience: 'Worked at Infosys for 3 years.',
    skills: ['Java', 'Python', 'Django'],
    responsibilities: [
      'Develop and maintain scalable Java applications.',
      'Implement backend functionality using Python and Django.',
      'Collaborate with cross-functional teams on project requirements.',
      'Conduct technical training sessions for junior developers.',
    ],
  },
];

const About: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <div className="grid grid-cols-3 gap-8 mb-8">
        {people.map((person) => (
          <div key={person.id} className="bg-gray-200 p-6 rounded-md">
            <h2 className="text-lg font-semibold mb-2">{person.name}</h2>
            <p>
              <strong>ID:</strong> {person.id}
            </p>
            <p>
              <strong>Email:</strong> {person.email}
            </p>
            <p className="mt-4">{person.experience}</p>
            <p className="mt-2">
              <strong>Skills:</strong> {person.skills.join(', ')}
            </p>
            <div className="mt-4">
              <strong>Responsibilities:</strong>
              <ul className="list-disc list-inside">
                {person.responsibilities.map((responsibility, index) => (
                  <li key={index}>{responsibility}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
