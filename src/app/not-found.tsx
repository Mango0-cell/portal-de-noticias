import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto text-center">
        <div className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mb-4">404</div>
        <h1 className="text-3xl font-bold text-foreground mb-4">
          Page not found
        </h1>
        <p className="text-secondary mb-8">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/">
            <Button>
              Back to home
            </Button>
          </Link>
          <Link href="/search">
            <Button variant="outline">
              Discover news
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
