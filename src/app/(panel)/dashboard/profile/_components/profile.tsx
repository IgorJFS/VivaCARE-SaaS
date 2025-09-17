'use client';
import { useState } from 'react';
import { ProfileForm, ProfileFormData } from './profile-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

import imgTest from '../../../../../../public/foto1.png';
import { cn } from '@/lib/utils';
import { Prisma } from '@/generated/prisma';

type UserWithSubscription = Prisma.UserGetPayload<{ include: { subscription: true } }>;
interface ProfileContentProps {
  user: UserWithSubscription & {};
}

export function ProfileContent({ user }: ProfileContentProps) {
  const [selectedHours, setSelectedHours] = useState<string[]>(user.times ?? []);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = ProfileForm({
    name: user.name || '',
    address: user.address || '',
    phone: user.phone || '',
    status: user.status,
    timeZone: user.timeZone || '',
  });

  function generateTimeSlots(): string[] {
    const timeSlots: string[] = [];

    for (let i = 8; i < 24; i++) {
      for (let m = 0; m < 2; m++) {
        const minute = m * 30;
        let period = 'AM';
        let displayHour = i;
        if (i === 24) {
          displayHour = 12;
          period = 'AM';
        } else if (i === 12) {
          period = 'PM';
        } else if (i > 12) {
          displayHour = i - 12;
          period = 'PM';
        } else {
          period = 'AM';
        }
        const minuteStr = minute.toString().padStart(2, '0');
        timeSlots.push(`${displayHour}:${minuteStr} ${period}`);
      }
    }

    return timeSlots;
  }

  const timeZoneOptions = Intl.supportedValuesOf('timeZone').filter(
    zone =>
      zone.startsWith('America/Los_Angeles') ||
      zone.startsWith('America/New_York') ||
      zone.startsWith('America/Chicago') ||
      zone.startsWith('America/Denver') ||
      zone.startsWith('America/Sao_Paulo') ||
      zone.startsWith('Europe/London') ||
      zone.startsWith('Europe/Berlin') ||
      zone.startsWith('Europe/Paris'),
  );

  const hours = generateTimeSlots();

  function toggleHour(hour: string) {
    setSelectedHours(prev => (prev.includes(hour) ? prev.filter(h => h !== hour) : [...prev, hour].sort()));
  }

  async function onSubmit(data: ProfileFormData) {
    const profileData = {
      ...data,
      times: selectedHours,
    };
    console.log('data:', profileData);
  }

  return (
    <div className='mx-auto'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card>
            <CardHeader>
              <CardTitle>My Profile</CardTitle>
            </CardHeader>
            <CardContent className='space-y-6'>
              <div className='flex justify-center'>
                <div className='bg-gray-200 relative h-40 w-40 rounded-full overflow-hidden'>
                  <Image src={user.image ? user.image : imgTest} alt='Clinic Photo' fill className='object-cover' />
                </div>
              </div>

              <div className='space-y-4'>
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='font-semibold'>Full Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder='Enter clinic name...' />
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
                      <FormLabel className='font-semibold'>Full Address:</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder='Enter clinic address...' />
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
                        <Input {...field} placeholder='Enter phone number...' />
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
                      <FormLabel className='font-semibold'>Clinic Status</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} defaultValue={field.value ? 'active' : 'inactive'}>
                          <SelectTrigger>
                            <SelectValue placeholder='Select clinic status' />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value='active'>ACTIVE (clinic open)</SelectItem>
                            <SelectItem value='inactive'>INACTIVE (clinic closed)</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />

                <div className='space-y-2'>
                  <Label className='font-semibold'>Set Clinic Hours</Label>

                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant='outline' className='w-full justify-between'>
                        Click here to select hours
                        <ArrowRight className='w-5 h-5' />
                      </Button>
                    </DialogTrigger>

                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Clinic Hours</DialogTitle>
                        <DialogDescription>Select the operating hours below:</DialogDescription>
                      </DialogHeader>

                      <section className='py-4'>
                        <p className='text-sm text-muted-foreground mb-2'>
                          Click on the times below to select or deselect:
                        </p>

                        <div className='grid grid-cols-5 gap-2'>
                          {hours.map(hour => (
                            <Button
                              key={hour}
                              variant='outline'
                              className={cn(
                                'h-10',
                                selectedHours.includes(hour) && 'border-2 border-emerald-500 text-primary',
                              )}
                              onClick={() => toggleHour(hour)}
                            >
                              {hour}
                            </Button>
                          ))}
                        </div>
                      </section>

                      <Button className='mt-4 bg-emerald-500 text-black w-full' onClick={() => setIsDialogOpen(false)}>
                        Save Hours
                      </Button>
                    </DialogContent>
                  </Dialog>
                </div>
                <FormField
                  control={form.control}
                  name='timeZone'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='font-semibold'>Clinic Time Zone</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange}>
                          <SelectTrigger>
                            <SelectValue placeholder='Select clinic status' />
                          </SelectTrigger>
                          <SelectContent>
                            {timeZoneOptions.map(zone => (
                              <SelectItem key={zone} value={zone}>
                                {zone}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button type='submit' className='bg-emerald-500 text-black w-full'>
                  Save Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  );
}
