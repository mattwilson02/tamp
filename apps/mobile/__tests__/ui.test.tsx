import { render } from '@testing-library/react-native';
import React from 'react';
import { Button, Card, DifficultyBadge, RankBadge, Text, XpBar } from '../components/ui';

jest.mock('react-native-reanimated', () => require('react-native-reanimated/mock'));
jest.mock('expo-image', () => ({ Image: 'Image' }));

describe('Text', () => {
  it('renders all variants without crashing', () => {
    const variants = [
      'display',
      'heading',
      'title',
      'body',
      'bodySemiBold',
      'caption',
      'mono',
      'monoSmall',
    ] as const;
    variants.forEach((v) => {
      const { getByText } = render(<Text variant={v}>Hello</Text>);
      expect(getByText('Hello')).toBeTruthy();
    });
  });
});

describe('Button', () => {
  it('renders label', () => {
    const { getByText } = render(<Button label="Tap me" />);
    expect(getByText('Tap me')).toBeTruthy();
  });

  it('shows loading indicator when loading=true', () => {
    const { queryByText } = render(<Button label="Tap me" loading />);
    expect(queryByText('Tap me')).toBeNull();
  });
});

describe('Card', () => {
  it('renders children', () => {
    const { getByText } = render(
      <Card>
        <Text>Inside card</Text>
      </Card>
    );
    expect(getByText('Inside card')).toBeTruthy();
  });
});

describe('DifficultyBadge', () => {
  it('renders correct label for each rank', () => {
    const expected: Record<number, string> = {
      0: 'Beginner',
      1: 'Easy',
      2: 'Moderate',
      3: 'Advanced',
      4: 'Expert',
      5: 'Master',
    };
    Object.entries(expected).forEach(([rank, label]) => {
      const { getByText } = render(<DifficultyBadge rank={Number(rank) as 0} />);
      expect(getByText(label)).toBeTruthy();
    });
  });
});

describe('XpBar', () => {
  it('renders without crashing at max rank', () => {
    const { toJSON } = render(<XpBar xp={9999} rank={5} />);
    expect(toJSON()).toBeTruthy();
  });
});
