import { useState, useCallback, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import {  SortAsc, SortDesc, Trash2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { useDropzone } from 'react-dropzone';
import useQuery from '@/hooks/useQuery';
import AvatarManagementModal from './user-avatar-modal';
import useMutate from '@/hooks/useMutate';
import { toast } from '@/components/ui/use-toast';

export type Avatar = {
  id: number;
  avatar_name: string;
  avatar_path: string;
  avatar_url_path: string;
};

export default function AdvancedAdminAvatarManagement() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAvatar, setEditingAvatar] = useState<Avatar | null>(null);
  const [modalType, setModalType] = useState<'edit' | 'create'>('edit');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [selectedAvatars, setSelectedAvatars] = useState<number[]>([]);
  const { data, isLoading } = useQuery('/admin/user-avatars');
  const [filteredAvatars,setFilteredAvatars] = useState<Avatar[]>([]);
  const [file, setFile] = useState<File | null>(null);

  const onSuccess = (response)=>{
    toast({
      title: "Success",
      description: "Avatar uploaded successfully",
      variant: "success",
    });
    
    const newAvatar = response.user_avatar;
    modalType === 'edit' ? setFilteredAvatars(prev => prev.map(avatar => avatar?.id === newAvatar.id ? newAvatar : avatar)) : setFilteredAvatars(prev => [newAvatar, ...prev]);

    setIsModalOpen(false);
  }

  const [serverAction, { isLoading:isServerActionLoading }] = useMutate({ callback: undefined, navigateBack: false });
  const [avatarMutateAction, { isLoading:isMutating }] = useMutate({ callback: onSuccess, navigateBack: false });

  const handleOpenModal = (avatar?: Avatar, type: 'edit' | 'create' = 'edit') => {
    setModalType(type);
    setEditingAvatar(avatar || null);
    setIsModalOpen(true);
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const tempAvatar = {
      id: Date.now(),
      avatar_name: file.name,
      avatar_path: URL.createObjectURL(file),
      avatar_url_path :URL.createObjectURL(file),
    };
    setFile(file);
    handleOpenModal(tempAvatar, 'create');
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/png': ['.png'] },
    maxSize: 3 * 1024 * 1024, // 3MB
  });

  useEffect(() => {
    if (data) {
      const filteredAvatars = !isLoading && data?.user_avatars 
      .filter((avatar : Avatar) => avatar?.avatar_name.toLowerCase().includes(searchTerm.toLowerCase()))
      .sort((a: { id: number; }, b: { id: number; }) => {
          if (sortOrder === 'asc') {
            return a.id - b.id; 
          } else {
            return b.id - a.id; 
          }
        });
      setFilteredAvatars(filteredAvatars);
    }
  }, [data, isLoading, searchTerm, sortOrder]);


  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const toggleSort = () => {
    setSortOrder(prevOrder => (prevOrder === 'asc' ? 'desc' : 'asc'));
    setFilteredAvatars(prev => prev.slice().reverse());
  };

  const toggleSelectAvatar = (id: number) => {
    setSelectedAvatars(prev => 
      prev.includes(id) ? prev.filter(avatarId => avatarId !== id) : [...prev, id]
    );
  };

  const handleDeleteSelected = async () => {
    const response = await serverAction('admin/user-avatars/delete', { ids: selectedAvatars });
    if (!response.error) {
      toast({
        title: "Success",
        description: "Selected avatars deleted successfully",
        variant: "success",
      });
      setFilteredAvatars(prev => prev.filter(avatar => !selectedAvatars.includes(avatar.id)));
      setSelectedAvatars([]);
    }
  };

  const handleCloseModal = () => {
    setEditingAvatar(null);
    setIsModalOpen(false);
  };

  return (
    <Card className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Avatar Management</h1>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <Input
            type="text"
            placeholder="Search avatars..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-64"
          />
          <Button onClick={toggleSort}>
            {sortOrder === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
          </Button>
        </div>
        <Button
          onClick={handleDeleteSelected}
          disabled={!selectedAvatars.length || isServerActionLoading}
        >
          <Trash2 className="h-4 w-4 mr-2" /> Delete Selected
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8 max-h-[28rem] overflow-y-scroll">
        {!isLoading && filteredAvatars.map(avatar => (
          <Card 
            key={avatar.id}
            className={`cursor-pointer rounded-md  ${selectedAvatars.includes(avatar.id) ? 'ring-2 ring-primary' : ''}`}
          >
            <CardContent className="p-4 flex flex-col items-center">
              <Checkbox
                checked={selectedAvatars.includes(avatar.id)}
                onCheckedChange={() => toggleSelectAvatar(avatar.id)}
                className="self-start mb-2"
              />
              <Avatar
            onClick={() => handleOpenModal(avatar)}
              
              className="w-24 h-24 mb-2">
                <AvatarImage className="object-contain" src={avatar.avatar_url_path} alt={avatar.avatar_name} />
                <AvatarFallback>{avatar.avatar_name}</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">{avatar.avatar_name}</span>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Upload New Avatar</h2>
        <div {...getRootProps()} className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer">
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the PNG file here...</p>
          ) : (
            <p>Drag 'n' drop a PNG file here, or click to select a file</p>
          )}
          <p className="text-sm text-muted-foreground mt-2">(PNG, 100x100 to 1000x1000 pixels, max 3MB)</p>
        </div>
      </div>

      <AvatarManagementModal
        onSubmit={avatarMutateAction}
        type={modalType}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        avatar={editingAvatar !}
        droppedFile={file}
        isMutating={isMutating}
      />
    </Card>
  );
}
