import * as Tooltip2 from '@radix-ui/react-tooltip';

export default function Tooltip({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <Tooltip2.Provider>
      <Tooltip2.Root>
        <Tooltip2.Trigger>{children}</Tooltip2.Trigger>
        <Tooltip2.Portal>
          <Tooltip2.Content>
            {title}
            <Tooltip2.Arrow />
          </Tooltip2.Content>
        </Tooltip2.Portal>
      </Tooltip2.Root>
    </Tooltip2.Provider>
  );
}
