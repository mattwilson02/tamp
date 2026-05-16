export interface ScoringCriterion {
  key: string;
  label: string;
  descriptors: Record<1 | 2 | 3 | 4 | 5, string>;
}

export const SCORING_CRITERIA: Record<string, ScoringCriterion[]> = {
  espresso: [
    {
      key: 'crema_colour',
      label: 'Crema Colour',
      descriptors: {
        1: 'Very pale or none',
        2: 'Pale',
        3: 'Acceptable',
        4: 'Rich amber',
        5: 'Perfect tiger-stripe',
      },
    },
    {
      key: 'extraction_volume',
      label: 'Extraction Volume',
      descriptors: { 1: 'Way off', 2: 'Off', 3: 'Close', 4: 'On spec', 5: 'Spot on' },
    },
    {
      key: 'stream_consistency',
      label: 'Stream Consistency',
      descriptors: { 1: 'Channelling', 2: 'Uneven', 3: 'Acceptable', 4: 'Good', 5: 'Ribbon-like' },
    },
  ],
  'flat-white': [
    {
      key: 'crema_colour',
      label: 'Crema Colour',
      descriptors: {
        1: 'Very pale or none',
        2: 'Pale',
        3: 'Acceptable',
        4: 'Rich amber',
        5: 'Perfect',
      },
    },
    {
      key: 'milk_texture',
      label: 'Milk Texture',
      descriptors: {
        1: 'Frothy / bubbly',
        2: 'Too stiff',
        3: 'Acceptable',
        4: 'Silky',
        5: 'Perfect microfoam',
      },
    },
    {
      key: 'pour_symmetry',
      label: 'Pour Symmetry',
      descriptors: {
        1: 'No pattern',
        2: 'Messy',
        3: 'Recognisable',
        4: 'Clean',
        5: 'Symmetrical & sharp',
      },
    },
    {
      key: 'ratio_accuracy',
      label: 'Ratio Accuracy',
      descriptors: { 1: 'Way off', 2: 'Off', 3: 'Close', 4: 'On spec', 5: 'Textbook' },
    },
  ],
  cappuccino: [
    {
      key: 'milk_texture',
      label: 'Milk Texture',
      descriptors: {
        1: 'Wet / flat',
        2: 'Too dry',
        3: 'Acceptable',
        4: 'Good body',
        5: 'Perfect dry microfoam',
      },
    },
    {
      key: 'foam_ratio',
      label: 'Foam Ratio',
      descriptors: { 1: 'No foam', 2: 'Too little', 3: 'Close', 4: 'Good', 5: 'Classic 1/3 cap' },
    },
    {
      key: 'crema_colour',
      label: 'Crema Colour',
      descriptors: { 1: 'Very pale', 2: 'Pale', 3: 'Acceptable', 4: 'Rich', 5: 'Perfect' },
    },
  ],
};

export interface SubmitScoreDto {
  attemptId: string;
  scores: { criterionKey: string; score: 1 | 2 | 3 | 4 | 5 }[];
}
