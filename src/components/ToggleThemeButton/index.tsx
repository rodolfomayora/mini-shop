import { useThemeContext } from '#context/theme';

/* dark styles backup
  ${({ theme }) => theme.dark && css`
    box-shadow: ${colors.dark.shadow};
    border-color: ${colors.dark.blue3};
    background-color: ${colors.dark.blue2};
    background-image: url('/images/svg/moon.svg');
    background-size: 14px;
  `}
*/

export function ToggleThemeButton () {

  const { toggleTheme } = useThemeContext();

  return <input className="
      flex justify-center w-8 h-8
      rounded-full border-2 border-[var(--color-yellow)]
      cursor-pointer
      bg-[url('/images/svg/sun.svg')] bg-center bg-[length:20px]
      bg-no-repeat bg-[var(--color-white)]
    "
    type="button"
    onClick={toggleTheme}
    aria-lable="theme toggle button"
  />;
}