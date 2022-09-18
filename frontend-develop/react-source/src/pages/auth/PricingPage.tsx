import { Spacer, Grid, Text } from '@nextui-org/react';
import { PricingCard } from '../../components/auth/PricingCard';


const freeFeatures = [
	'Play anywhere',
	'Save your reproduciton history',
	'Like your favorite songs'
];

const premiumFeatures = [
	'Ad-free music listening, play offline, on-demand playback',
	'Premium access to new content',
	'Stats of the month',
	'Block explicit content'];

export const PricingPage = () => {
	return (
		<div className='animate__animated animate__fadeInDown center' style={{ width: '70%', border: 'none' }}>
			<Spacer y={4} />
			<h1 style={{ textAlign: 'center' }}>Pick your plan</h1>

			<Text style={{ textAlign: 'center', marginBottom: '10px' }}>
				Listen without limits on your phone, speaker, and other devices.
			</Text>

			<Spacer y={2} />
			{/** Pricing card */}
			<Grid.Container gap={2} justify='center' style={{ marginLeft: '150px', marginRight: '150px' }}>
				<Grid xs={6}>
					<PricingCard
						planName='Free'
						value={0}
						features={freeFeatures} />
				</Grid>
				<Grid xs={6}>
					<PricingCard
						planName='Premium'
						value={200}
						features={premiumFeatures} />
				</Grid>
				{/* <Grid xs={4}>
					<PricingCard planName='My Plan' value={9.99} features={['a', 'b', 'c']} />
				</Grid> */}

			</Grid.Container>
		</div>
	);
};
