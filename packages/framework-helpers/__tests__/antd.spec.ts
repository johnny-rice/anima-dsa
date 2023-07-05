import { getAntdTheme } from '../src/antd/antdTheme';

const tokens = {
  colors: {
    blue: {
      1: {
        $value: '#000000',
        $type: 'color',
      },
    },
  },
  antd: {
    token: {
      colorPrimary: {
        $value: '#ffffff',
        $type: 'color',
      },
      colorBgBase: {
        $value: '#ffffff',
        $type: 'color',
      },
      colorSuccess: {
        $value: '#ffffff',
        $type: 'color',
      },
      colorError: {
        $value: '{colors.blue.1}',
        $type: 'color',
      },
      primaryGap: {
        $value: 10,
        $type: 'number',
      },
    },
    components: {
      Button: {
        colorPrimary: {
          $value: '#ffffff',
          $type: 'color',
        },
      },
    },
  },
} as const;

describe('antd converters', () => {
  test('convert design tokens to antd theme', async () => {
    const theme = getAntdTheme(tokens);
    expect(theme).toMatchObject({
      token: {
        colorPrimary: '#ffffff',
        colorBgBase: '#ffffff',
        colorSuccess: '#ffffff',
        colorError: '#000000',
        primaryGap: 10,
      },
      components: {
        Button: {
          colorPrimary: '#ffffff',
        },
      },
    });
  });
  test('convert invalid design tokens to antd theme, seed $value root key (fail)', async () => {
    const invalidToken = {
      test: 'etc',
      antd: {
        $value: 'lol',
      },
    };
    // @ts-expect-error testing fail
    expect(() => getAntdTheme(invalidToken)).toThrow(/\$value as a root key/);
  });
  test('convert invalid design tokens to antd theme, no tokens (fail)', async () => {
    const invalidToken = {
      test: 'etc',
      antd: {
        primaryColor: 'lol',
      },
    };
    // @ts-expect-error testing fail
    expect(() => getAntdTheme(invalidToken)).toThrow(
      /Unexpected value in design/,
    );
  });
});
