import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useKarasu256API } from "@/hooks/use-karasu256-api";
import { toast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { type Gallery } from "@karasu-lab/karasu256-api-client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const gallerySchema = z.object({
  file: z.instanceof(File)
    .refine(
      file => ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(file.type),
      'File must be an image',
    ),
  character: z.any().optional(),
});

export default function Gallery() {
  const api = useKarasu256API();
  const [galleries, setGalleries] = useState<Gallery[]>([]);
  const [loading, setLoading] = useState(true);

  const form = useForm<z.infer<typeof gallerySchema>>({
    resolver: zodResolver(gallerySchema),
  })

  useEffect(() => {
    if (loading) {
      api.galleries.galleriesControllerGet({ query: {} }).then((response) => {
        setGalleries(response);

        setLoading(false);
      })
    }
    setLoading(false);
  }, [api.galleries, galleries, loading])

  function onSubmit(data: z.infer<typeof gallerySchema>) {
    toast({
      title: 'Uploading file...',
      variant: 'default',
    })
    setLoading(true);

    api.galleries.galleriesControllerUploadFile({
      formData: {
        file: data.file,
      },
    }).then((res) => {
      setGalleries([...galleries, res]);

      toast({
        title: 'File uploaded successfully',
        variant: 'default',
      });
    }).catch((error) => {
      toast({
        title: `Error: ${error.message}`,
        variant: 'destructive',
      });
    });


    setLoading(false);
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
            name="character"
            render={({ field }) => (
              <div>
                <Label form="character">Character</Label>
                <Input {...field} />
              </div>
            )}>
          </FormField>
        </div>
        <div className="mt-4">
          <Button
            onClick={form.handleSubmit(onSubmit)}>
            Submit
          </Button>
        </div>
      </Form>
      <div className="mt-10 grid grid-cols-7">
        {
          galleries.map((gallery) => (
            <div key={gallery.id}>
              <img src={`https://cdn.karasu256.com/${gallery.key}`} alt={gallery.alt} width={100} />
            </div>
          ))
        }
      </div>
    </div>
  )
}