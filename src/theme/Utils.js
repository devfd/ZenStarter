/* eslint import/prefer-default-export: 0 */

/*
 * cross-platform elevation
 */
export const elevation = level => ({
  elevation: level,
  shadowOpacity: (0.0015 * level) + 0.18,
  shadowRadius: 0.54 * level,
  shadowOffset: {
    height: 0.6 * level,
  },
});
