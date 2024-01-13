import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Skeleton } from '../ui/skeleton';

interface Recipe {
  title: string;
  image: string;
  time: number;
  description: string;
  vegan: boolean;
  id: string;
}

const RecipesList = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const getRecipes = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:4000/recipes');
        await new Promise((resolve) => setTimeout(resolve, 3000));
        const result: Recipe[] = await response.json();
        setRecipes(result);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getRecipes();
  }, []);

  if (loading) {
    return (
      <main>
        <div className='grid grid-cols-3 gap-8'>
          {'abcdefghi'.split('').map((i) => (
            <Card key={i} className='flex flex-col justify-between'>
              <CardHeader className='flex-row gap-4 items-center'>
                <Skeleton className='w-12 h-12 rounded-full' />
                <Skeleton className='h-6 flex-grow' />
              </CardHeader>
              <CardContent>
                <Skeleton className='h-4 flex-grow mt-4' />
                <Skeleton className='h-4 flex-grow mt-4' />
                <Skeleton className='h-4 w-1/2 mt-4' />
              </CardContent>
              <CardFooter>
                <Skeleton className='h-10 w-28' />
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    );
  }

  return (
    <main>
      <div className='grid grid-cols-3 gap-8'>
        {recipes.map((recipe) => (
          <Card key={recipe.id} className='flex flex-col justify-between'>
            <CardHeader className='flex-row gap-4 items-center'>
              <Avatar>
                <AvatarImage src={`/img/${recipe.image}`} alt='recipe image' />
                <AvatarFallback>{recipe.title.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>{recipe.title}</CardTitle>
                <CardDescription>{recipe.time} mins to cook.</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p>{recipe.description}</p>
            </CardContent>
            <CardFooter className='flex justify-between'>
              <Button>View Recipe</Button>
              {recipe.vegan && <Badge variant='secondary'>Vegan!</Badge>}
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  );
};

export default RecipesList;
