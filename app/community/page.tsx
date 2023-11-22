'use client';
import React from "react";
import { useState } from "react";
import Button from '@/components/atoms/button';
import Input from '@/components/atoms/input';
import Typography from '@/components/atoms/typography';
import { EyeOff, User2 } from 'lucide-react';
import Link from 'next/link';
import _ from "underscore";
import Head from 'next/head'


export default function Community() {

  return (
      <Typography variant='h2' className='max-lg:text-center text-[#323232] max-lg:mt-44'>
        Welcome to the Coummunity!
      </Typography>
  )
}
