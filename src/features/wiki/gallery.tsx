import { ConfirmDialog } from "@/components/confirm-dialog";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Form, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAPIWithCredentials, useKarasu256API } from "@/hooks/use-karasu256-api";
import { toast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { GICharacter, type Gallery } from "@karasu-lab/karasu256-api-client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const gallerySchema = z.object({
  file: z.instanceof(File)
    .refine(
      file => ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(file.type),
      'File must be an image',
    ),
  filename: z.string().nonempty(),
  character: z.any().optional(),
});

export default function Gallery() {
  const api = useAPIWithCredentials();
  const publicAPI = useKarasu256API();
  const [galleries, setGalleries] = useState<Gallery[] | null>(null);
  const [characters, setCharacters] = useState<GICharacter[] | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedGallery, setSelectedGallery] = useState<Gallery | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [reloading, setReloading] = useState(false);

  const form = useForm<z.infer<typeof gallerySchema>>({
    resolver: zodResolver(gallerySchema),
    mode: 'onSubmit',
  })

  const reloadForm = useForm<any>({
    mode: 'onSubmit',
  })

  useEffect(() => {
    async function loadCharacters() {
      if (!characters) {
        const characters = await publicAPI.characters.charactersControllerGet({});
        setCharacters(characters);
      }
    }

    async function loadGalleries() {
      if (!galleries) {
        const galleries = await publicAPI.galleries.galleriesControllerGet({});
        setGalleries(galleries);
      }
    }

    if (!loaded) {
      loadCharacters();
      loadGalleries();
      setLoaded(true);
    }

    return function cleanup() { }
  }, [api.galleries, characters, galleries, loaded, publicAPI.characters, publicAPI.galleries, reloading])

  async function onSubmit(data: z.infer<typeof gallerySchema>) {
    if (data.filename) {
      const formattedFile = new File([data.file], data.filename, {
        type: data.file.type,
      });

      try {
        toast({
          title: 'Uploading file...',
          description: `Uploading file: ${data.file.name}`,
          variant: 'default',
        })
        const comment = data.character ? `Character: ${data.character.name}` : '';
        const outletId = data.character ? data.character.id : undefined;

        await api.galleries.galleriesControllerUploadFile(comment, outletId, formattedFile);

        toast({
          title: `File uploaded successfully`,
          variant: 'default',
        })
      }
      catch (error: any) {
        toast({
          title: 'Failed to upload file',
          description: error.message,
          variant: 'destructive',
        })
      }
    }
  }

  async function onSubmitReloading() {
    setReloading(true);

    if (galleries) {
      setGalleries(null);

      const galleries = await publicAPI.galleries.galleriesControllerGet({});
      setGalleries(galleries);
    }

    return;
  }

  return (
    <div className="m-10">
      <Form {...form}>
        <div className="mt-4">
          <FormField control={form.control}
            name="file"
            render={({ field }) => (
              <div>
                <Label form="url">File</Label>
                <Input type="file" onChange={(e) => field.onChange(e.target.files?.[0])} />
              </div>
            )}>
          </FormField>
        </div>
        <div className="mt-4">
          <FormField control={form.control}
            name="filename"
            render={({ field }) => (
              <div>
                <Label form="filename">Filename</Label>
                <Input {...field} />
              </div>
            )}>
          </FormField>
        </div>
        <div className="mt-4">
          <FormField control={form.control}
            name="character"
            render={({ field }) => (
              <div>
                <DropdownMenu modal={false}>
                  <DropdownMenuTrigger>
                    <Button>
                      {field.value ? field.value.name : 'Select a character'}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <ScrollArea>
                      <DropdownMenuItem onSelect={() => field.onChange(undefined)}>
                        None
                      </DropdownMenuItem>
                      {
                        characters?.map((character) => (
                          <DropdownMenuItem key={character.id} onSelect={() => field.onChange(character)}>
                            {character.name}
                          </DropdownMenuItem>
                        ))
                      }
                    </ScrollArea>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}>
          </FormField>
        </div>
        <div className="mt-4">
          <Button disabled={!form.formState.errors}
            onClick={form.handleSubmit(onSubmit)}>
            Submit
          </Button>
        </div>
      </Form>
      <ConfirmDialog
        open={openDialog}
        onOpenChange={setOpenDialog}
        handleConfirm={async () => {
          if (selectedGallery) {
            toast({
              title: 'Deleting gallery...',
              variant: 'default',
            })
            await api.galleries.galleriesControllerDelete(selectedGallery.id.toString());

            if (galleries) {
              setGalleries(galleries.filter(gallery => gallery.id !== selectedGallery.id));
            }

            toast({
              title: 'Gallery deleted successfully',
              variant: 'default',
            });

            setSelectedGallery(null);
            setOpenDialog(false);
          }
        }}
        title={"Delete gallery?"}
        desc={"Are you sure you want to delete this gallery?"}
      >
        <div>
          <img src={`${import.meta.env.VITE_CDN_URL}/${selectedGallery?.key}`} alt={selectedGallery?.alt} width={100} />
          <p>{selectedGallery?.alt}</p>
        </div>
      </ConfirmDialog>
      <Form {...reloadForm}>
        <div className="mt-10 mb-10">
          <Button type="submit" onClick={reloadForm.handleSubmit(onSubmitReloading)}>
            Reload
          </Button>
        </div>
      </Form>
      <div className="mt-10 grid grid-cols-7">
        {
          galleries?.map((gallery) => (
            <div key={gallery.id} onClick={() => {
              setSelectedGallery(gallery);
              setOpenDialog(true);
            }}>
              <img src={`${import.meta.env.VITE_CDN_URL}/${gallery.key}`} alt={gallery.alt} width={100} />
            </div>
          ))
        }
      </div>
    </div>
  )
}