import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import chinaDailyThumb from "@/assets/chinadaily-interview.jpg";

const videos = [
  {
    id: "06Tf9_mREjk",
    title: "Uzbek young scholars",
    url: "https://youtu.be/06Tf9_mREjk?si=AzKSq_cPlbLheQAI",
  },
  {
    id: "_EtjTgEzglI",
    title: "Young Uzbek Scholars",
    url: "https://youtu.be/_EtjTgEzglI?si=Z1O5LclqutoF_R3t",
  },
  {
    id: "xVVcxMNqQnM",
    title: "HKU PhD scholarship video",
    url: "https://youtu.be/xVVcxMNqQnM?si=jVbZWpWSvqLocJov",
  },
  {
    id: "chinadaily-634535",
    title: "China Daily HK Interview",
    url: "https://www.chinadailyhk.com/video?play_id=634535",
    thumbnail: chinaDailyThumb,
  },
];

const SocialMedia = () => {
  return (
    <section id="social-media" className="py-20 px-4 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          Social Media
        </h2>

        <Carousel className="w-full max-w-5xl mx-auto">
          <CarouselContent>
            {videos.map((video) => (
              <CarouselItem key={video.id} className="md:basis-1/2 lg:basis-1/2">
                <a
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group"
                >
                  <div className="relative overflow-hidden rounded-lg border border-border bg-card hover:shadow-lg transition-all duration-300">
                    <div className="relative aspect-video">
                      <img
                        src={video.thumbnail ?? `https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                        alt={video.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                        <svg
                          className="w-16 h-16 text-white opacity-90 group-hover:scale-110 transition-transform"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </a>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
};

export default SocialMedia;
