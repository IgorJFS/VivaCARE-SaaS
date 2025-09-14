import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters long'),
  address: z.string().optional(),
  phone: z.string().optional(),
  status: z.string().optional(),
  timeZone: z.string().min(2, 'Time zone must be at least 2 characters long'),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export function ProfileForm() {
  return useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: '', address: '', phone: '', status: 'Active', timeZone: '' },
  });
}
