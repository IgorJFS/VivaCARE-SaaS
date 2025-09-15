'use client';
import { ProfileForm } from './profile-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import imgTest from '../../../../../../public/foto1.png';

export function ProfileContent() {
  const form = ProfileForm();

  return (
    <div className='mx-auto'>
      <Form {...form}>
        <Card>
          <CardHeader>
            <CardTitle className='text-2xl font-bold'>Profile</CardTitle>
          </CardHeader>
          <CardContent className='space-y-6'>
            <div className='flex justify-center'>
              <div className='relative bg-gray-200 h-40 w-40 rounded-full overflow-hidden'>
                <Image src={imgTest} alt='Profile Picture' fill className='object-cover' />
              </div>
            </div>
            <div className='space-y-4'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='font-semibold'>Full name</FormLabel>
                    <FormControl>
                      <Input placeholder='Your clinic name...' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='address'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='font-semibold'>Address</FormLabel>
                    <FormControl>
                      <Input placeholder='Your clinic address...' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='phone'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='font-semibold'>Phone</FormLabel>
                    <FormControl>
                      <Input placeholder='Your clinic name...' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='status'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='font-semibold'>Full name</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value ? 'active' : 'inactive'}>
                        <SelectTrigger>
                          <SelectValue placeholder='Select your status' {...field} />
                          <SelectContent>
                            <SelectItem value='active'>ACTIVE (clinic open)</SelectItem>
                            <SelectItem value='inactive'>INACTIVE (clinic closed)</SelectItem>
                          </SelectContent>
                        </SelectTrigger>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>
      </Form>
    </div>
  );
}
