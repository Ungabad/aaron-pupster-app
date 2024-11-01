export default function Home() {
  return (
    <div className='items-center justify-items-center p-8 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
      <h1 className='text-4xl font-bold text-center mb-4'>
        Welcome to Pupster
      </h1>
      <video
        autoPlay
        muted
        className='h-1/2 w-1/2'
        controls
        preload='none'
        loop
      >
        <source src='/3042473-uhd_3840_2160_30fps.mp4' type='video/mp4' />
        <track
          src='/path/to/captions.vtt'
          kind='subtitles'
          srcLang='en'
          label='English'
        />
        Your browser does not support the video tag.
      </video>
      <p className='text-xl text-center mt-8'>
        Where you get to meet dogs and give them a like. Search by breed and see
        all the variety
      </p>
    </div>
  );
}
