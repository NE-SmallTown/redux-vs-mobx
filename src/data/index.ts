export const getInitialData = () => {
    const root = {
          level: 1,
          id: '1-1',
          value: '🤫',
          children: [
              {
                  level: 2,
                  id: '2-1',
                  value: '🤫',
                  children: [
                      {
                          level: 3,
                          id: '3-1',
                          value: '🤫',
                          children: [],
                      },
                      {
                          level: 3,
                          id: '3-2',
                          value: '🤫',
                          children: [],
                      },
                  ],
              },
              {
                  level: 2,
                  id: '2-2',
                  value: '🤫',
                  children: [
                      {
                          level: 3,
                          id: '3-3',
                          value: '🤫',
                          children: [],
                      },
                      {
                          level: 3,
                          id: '3-4',
                          value: '🤫',
                          children: [],
                      },
                  ],
              },
              {
                  level: 2,
                  id: '2-3',
                  value: '🤫',
                  children: [
                      {
                          level: 3,
                          id: '3-5',
                          value: '🤫',
                          children: [],
                      },
                      {
                          level: 3,
                          id: '3-6',
                          value: '🤫',
                          children: [],
                      },
                  ],
              },
          ],
    };

    return root;
};