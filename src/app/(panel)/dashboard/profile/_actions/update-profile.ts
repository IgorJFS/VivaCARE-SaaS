'use server';

import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { ProfileFormData } from '../_components/profile-form';
import { z } from 'zod';

export async function updateProfile(data: ProfileFormData) {
  const user = await auth();
}
