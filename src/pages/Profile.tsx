import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { User, Settings, Camera, Edit2, Save, LogOut } from 'lucide-react';

interface UserProfile {
  fullName: string;
  email: string;
  jobTitle: string;
  company: string;
  location: string;
}

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    jobTitle: 'Senior Developer',
    company: 'Tech Corp',
    location: 'San Francisco, CA'
  });

  const [formData, setFormData] = useState<UserProfile>(profile);

  const handleSave = () => {
    setProfile(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(profile);
    setIsEditing(false);
  };

  const handleSignOut = () => {
    console.log('Signing out...');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="bg-white dark:bg-slate-900 rounded-[24px] shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center">
              <User className="text-blue-600 dark:text-blue-400" size={20} />
            </div>
            Account Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Profile Section */}
          <div className="flex flex-col items-center space-y-4 pb-6 border-b border-slate-200 dark:border-slate-700">
            {/* Avatar */}
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold">
                {profile.fullName.split(' ').map(n => n[0]).join('')}
              </div>
              <button className="absolute bottom-0 right-0 w-8 h-8 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center shadow-lg">
                <Camera size={16} className="text-slate-600 dark:text-slate-300" />
              </button>
            </div>

            <div className="text-center">
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                {profile.fullName}
              </h2>
              <p className="text-slate-600 dark:text-slate-300">
                {profile.jobTitle} at {profile.company}
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {profile.location}
              </p>
            </div>
          </div>

          {/* Form Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">Personal Information</h3>
              {!isEditing && (
                <Button
                  label="Edit"
                  variant="outline"
                  size="sm"
                  icon={<Edit2 size={16} />}
                  onClick={() => setIsEditing(true)}
                />
              )}
            </div>

            {isEditing ? (
              <div className="space-y-4">
                <Input
                  label="Full Name"
                  type="text"
                  placeholder="Your full name"
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  variant="primary"
                />
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  variant="primary"
                />
                <Input
                  label="Job Title"
                  type="text"
                  placeholder="Your job title"
                  value={formData.jobTitle}
                  onChange={(e) => setFormData({...formData, jobTitle: e.target.value})}
                  variant="primary"
                />
                <Input
                  label="Company"
                  type="text"
                  placeholder="Your company"
                  value={formData.company}
                  onChange={(e) => setFormData({...formData, company: e.target.value})}
                  variant="primary"
                />
                <Input
                  label="Location"
                  type="text"
                  placeholder="Your location"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  variant="primary"
                />
                <div className="flex gap-3 pt-4">
                  <Button
                    label="Save Changes"
                    variant="primary"
                    icon={<Save size={16} />}
                    onClick={handleSave}
                  />
                  <Button
                    label="Cancel"
                    variant="outline"
                    onClick={handleCancel}
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm text-slate-600 dark:text-slate-400">Full Name</span>
                  <span className="text-slate-900 dark:text-slate-100">{profile.fullName}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm text-slate-600 dark:text-slate-400">Email</span>
                  <span className="text-slate-900 dark:text-slate-100">{profile.email}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm text-slate-600 dark:text-slate-400">Job Title</span>
                  <span className="text-slate-900 dark:text-slate-100">{profile.jobTitle}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm text-slate-600 dark:text-slate-400">Company</span>
                  <span className="text-slate-900 dark:text-slate-100">{profile.company}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm text-slate-600 dark:text-slate-400">Location</span>
                  <span className="text-slate-900 dark:text-slate-100">{profile.location}</span>
                </div>
              </div>
            )}
          </div>

          {/* Preferences */}
          <div className="space-y-4 pt-6 border-t border-slate-200 dark:border-slate-700">
            <h3 className="font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Settings size={18} />
              Preferences
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-slate-700 dark:text-slate-300">Email Notifications</span>
                <button className="w-12 h-6 rounded-xl bg-blue-600 relative transition-colors">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-xl"></div>
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-slate-700 dark:text-slate-300">Dark Mode</span>
                <button className="w-12 h-6 rounded-xl bg-slate-300 dark:bg-blue-600 relative transition-colors">
                  <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-xl dark:right-1 dark:left-auto"></div>
                </button>
              </div>
            </div>
          </div>

          {/* Sign Out */}
          <div className="pt-6 border-t border-slate-200 dark:border-slate-700">
            <Button
              label="Sign Out"
              variant="outline"
              icon={<LogOut size={16} />}
              onClick={handleSignOut}
              className="w-full"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
