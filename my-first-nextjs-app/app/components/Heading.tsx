interface HeadingProps {
    children: React.ReactNode;
    className?: string;
  }
  
  export default function Heading({ children, className = '' }: HeadingProps) {
    return (
      <h1 className={`text-4xl font-bold mb-8 text-heading-light dark:text-heading-dark ${className}`}>
        {children}
      </h1>
    )
  }
