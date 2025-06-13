import teamMembers from '@/components/AboutUs/teamData';

describe('teamData', () => {
  test('contains valid team member data', () => {
    expect(teamMembers.length).toBeGreaterThan(0);

    teamMembers.forEach((member) => {
      expect(member).toHaveProperty('name');
      expect(member).toHaveProperty('role');
      expect(member).toHaveProperty('bio');
      expect(member).toHaveProperty('image');
      expect(member).toHaveProperty('github');
      expect(member).toHaveProperty('linkedin');
      expect(member).toHaveProperty('contributions');

      expect(member.contributions.length).toBeGreaterThan(0);

      member.contributions.forEach((contribution) => {
        expect(contribution).toHaveProperty('title');
        expect(contribution).toHaveProperty('description');
        expect(contribution).toHaveProperty('image');
      });
    });
  });
});
