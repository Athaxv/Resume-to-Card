'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { Upload, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation';

export function CardForm({ card, onSubmit, onClose, isPage = false }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: card?.name || '',
    title: card?.title || '',
    bio: card?.bio || '',
    github: card?.github || '',
    linkedin: card?.linkedin || '',
    skills: card?.skills || [],
    image: card?.image || '',
  });

  // 👇 Fix: Sync formData with card prop changes (prevents input bug)
  useEffect(() => {
    setFormData({
      name: card?.name || '',
      title: card?.title || '',
      bio: card?.bio || '',
      github: card?.github || '',
      linkedin: card?.linkedin || '',
      skills: card?.skills || [],
      image: card?.image || '',
    });
  }, [card]);

  const [currentSkill, setCurrentSkill] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.bio.trim()) newErrors.bio = 'Bio is required';
    if (formData.bio.split(' ').length > 50) newErrors.bio = 'Bio must be 50 words or less';

    // GitHub validation
    if (formData.github && !/^https?:\/\/(www\.)?github\.com\/.+/.test(formData.github)) {
      newErrors.github = 'Invalid GitHub URL format';
    }

    // LinkedIn validation
    if (formData.linkedin && !/^https?:\/\/(www\.)?linkedin\.com\/in\/.+/.test(formData.linkedin)) {
      newErrors.linkedin = 'Invalid LinkedIn URL format';
    }

    if (formData.skills.length === 0) newErrors.skills = 'At least one skill is required';
    if (formData.skills.length > 5) newErrors.skills = 'Maximum 5 skills allowed';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    // Save to localStorage
    try {
      localStorage.setItem(`profile_${formData.name}`, JSON.stringify(formData));
    } catch (err) {
      // handle quota or serialization errors if needed
    }
    if (onSubmit) onSubmit(formData);
    setIsSubmitting(false);
    // Redirect to /profile/{name}
    router.push(`/profile/${encodeURIComponent(formData.name)}`);
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[field];
        return updated;
      });
    }
  };

  const addSkill = () => {
    if (
      currentSkill.trim() &&
      formData.skills.length < 5 &&
      !formData.skills.includes(currentSkill.trim())
    ) {
      handleInputChange('skills', [...formData.skills, currentSkill.trim()]);
      setCurrentSkill('');
    }
  };

  const removeSkill = (skillToRemove) => {
    handleInputChange(
      'skills',
      formData.skills.filter((skill) => skill !== skillToRemove)
    );
  };

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFileUpload = (file) => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          handleInputChange('image', e.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  const FormContent = () => (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label>Profile Image</Label>
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
            dragActive
              ? 'border-primary bg-primary/5'
              : 'border-border hover:border-primary/50'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          {formData.image ? (
            <div className="space-y-2">
              <div className="w-20 h-20 mx-auto rounded-full overflow-hidden">
                <img
                  src={formData.image}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleInputChange('image', '')}
              >
                Remove Image
              </Button>
            </div>
          ) : (
            <div className="space-y-2">
              <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground" />
              <div>
                <p className="text-sm">Drop an image here, or</p>
                <div className="mt-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileInputChange}
                    className="hidden"
                    id="file-upload"
                  />
                  <Button type="button" variant="outline" size="sm" asChild>
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <Upload className="h-4 w-4 mr-2" />
                      Browse Files
                    </label>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="Megan Fox"
            className={errors.name ? 'border-destructive' : ''}
          />
          {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="title">Job Title *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            placeholder="Frontend Developer"
            className={errors.title ? 'border-destructive' : ''}
          />
          {errors.title && <p className="text-sm text-destructive">{errors.title}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="bio">Bio (max 50 words) *</Label>
        <Textarea
          id="bio"
          value={formData.bio}
          onChange={(e) => handleInputChange('bio', e.target.value)}
          placeholder="Brief description about yourself..."
          rows={5}
          className={errors.bio ? 'border-destructive' : ''}
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>
            {formData.bio.split(' ').filter((word) => word.length > 0).length}/50 words
          </span>
          {errors.bio && <span className="text-destructive">{errors.bio}</span>}
        </div>
      </div>

      <div className="space-y-2">
        <Label>Skills (max 5) *</Label>
        <div className="flex space-x-2">
          <Input
            value={currentSkill}
            onChange={(e) => setCurrentSkill(e.target.value)}
            placeholder="Add a skill..."
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
          />
          <Button type="button" onClick={addSkill} disabled={formData.skills.length >= 5}>
            Add
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {formData.skills.map((skill) => (
            <Badge key={skill} variant="secondary" className="flex items-center space-x-1">
              <span>{skill}</span>
              <button
                type="button"
                onClick={() => removeSkill(skill)}
                className="ml-1 hover:text-destructive"
              >
                ✕
              </button>
            </Badge>
          ))}
        </div>
        {errors.skills && <p className="text-sm text-destructive">{errors.skills}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="github">GitHub Profile</Label>
          <Input
            id="github"
            value={formData.github}
            onChange={(e) => handleInputChange('github', e.target.value)}
            placeholder="https://github.com/username"
            className={errors.github ? 'border-destructive' : ''}
          />
          {errors.github && <p className="text-sm text-destructive">{errors.github}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="linkedin">LinkedIn Profile</Label>
          <Input
            id="linkedin"
            value={formData.linkedin}
            onChange={(e) => handleInputChange('linkedin', e.target.value)}
            placeholder="https://linkedin.com/in/username"
            className={errors.linkedin ? 'border-destructive' : ''}
          />
          {errors.linkedin && <p className="text-sm text-destructive">{errors.linkedin}</p>}
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-4 border-t">
        {/* <Button type="button" variant="outline" onClick={onClose}>
          Close
        </Button> */}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : card ? 'Update Profile' : 'Create Profile'}
        </Button>
      </div>
    </form>
  );

  if (isPage) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl">
            {card ? 'Edit Profile' : 'Create Profile'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <FormContent />
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="fixed inset-0 bg-black p-8 overflow-y-auto z-50">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex justify-between items-center border-b pb-4">
          <h1 className="text-3xl font-semibold">
            {card ? 'Edit Profile' : 'Create Your Developer Card'}
          </h1>
        </div>
        <FormContent />
      </div>
    </div>
  );
}
