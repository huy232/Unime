/* eslint-disable import/no-anonymous-default-export */
import React, { forwardRef } from "react"
import {
	Grid,
	Typography,
	Button,
	makeStyles,
	IconButton,
	Popover,
	Menu,
} from "@material-ui/core/"
import Tooltip from "@mui/material/Tooltip"
import { styled } from "@mui/material/styles"
import Slider from "@mui/material/Slider"
import {
	FastRewind,
	FastForward,
	PlayArrow,
	Pause,
	VolumeUp,
	VolumeOff,
	Fullscreen,
} from "@material-ui/icons"
import PropTypes from "prop-types"
import { useNavigate } from "react-router-dom"

const useStyles = makeStyles({
	controlsWrapper: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		background: "rgba(0,0,0,0)",
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between",
		zIndex: 1,
	},
	controlIcons: {
		color: "#777",
		transform: "scale(0.9)",
		"&:hover": {
			color: "#fff",
			transform: "scale(1)",
		},
	},
	bottomIcons: {
		color: "#999",
		"&:hover": {
			color: "#fff",
		},
	},
	volumeSlider: {
		width: "100px !important",
		height: "1px !important",
		color: "rgba(255,0,0,0.5)!important",
		"@media screen and (max-width: 640px)": {
			width: "50px !important",
		},
	},
})

function ValueLabelComponent(props) {
	const { children, value } = props

	return (
		<Tooltip enterTouchDelay={0} placement="top" title={value}>
			{children}
		</Tooltip>
	)
}

const PrettoSlider = styled(Slider)({
	color: "rgba(255,0,0,0.5)",
	height: 8,
	"& .MuiSlider-track": {
		border: "none",
	},
	"& .MuiSlider-thumb": {
		height: 24,
		width: 24,
		backgroundColor: "#fff",
		border: "2px solid currentColor",
		"&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
			boxShadow: "inherit",
		},
		"&:before": {
			display: "none",
		},
	},
	"& .MuiSlider-valueLabel": {
		lineHeight: 1.2,
		fontSize: 12,
		background: "unset",
		padding: 0,
		width: 32,
		height: 32,
		borderRadius: "50% 50% 50% 0",
		backgroundColor: "#52af77",
		transformOrigin: "bottom left",
		transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
		"&:before": { display: "none" },
		"&.MuiSlider-valueLabelOpen": {
			transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
		},
		"& > *": {
			transform: "rotate(45deg)",
		},
	},
})

export default forwardRef(
	(
		{
			anime,
			title,
			currentEpisodeName,
			onPlayPause,
			playing,
			onRewind,
			onFastForward,
			muted,
			onMute,
			onVolumeChange,
			onVolumeSeekUp,
			volume,
			playbackRate,
			onPlaybackRateChange,
			onToggleFullScreen,
			played,
			onSeek,
			onSeekMouseDown,
			onSeekMouseUp,
			elapsedTime,
			totalDuration,
			onChangeDisplayFormat,
			next,
		},
		ref
	) => {
		const navigate = useNavigate()
		const classes = useStyles()
		const [anchorEl, setAnchorEl] = React.useState(null)

		const handlePopover = (event) => {
			setAnchorEl(event.currentTarget)
		}

		const handleClose = () => {
			setAnchorEl(null)
		}
		const handleGoBack = () => {
			navigate(`/info/${anime}`)
		}
		const open = Boolean(anchorEl)
		const id = open ? "playbackrate-popover" : undefined

		const handleNext = () => {
			navigate(`?index=${next}`)
		}

		return (
			<div className={classes.controlsWrapper} ref={ref}>
				{/* Top Controls */}
				<Grid
					container
					direction="row"
					alignItems="center"
					justifyContent="space-between"
					style={{ padding: 16 }}
				>
					<Grid item>
						<Button
							variant="contained"
							style={{ backgroundColor: "rgba(255,0,0,0.4)" }}
							className="go-back-button"
							onClick={() => {
								handleGoBack()
							}}
						>
							Quay lại
						</Button>
					</Grid>
					<Grid item style={{ textAlign: "end" }}>
						<Typography
							variant="h5"
							style={{ color: "white", textAlign: "right" }}
						>
							{title}
						</Typography>
						<Typography variant="h6" style={{ color: "white" }}>
							{currentEpisodeName}
						</Typography>
						{next ? (
							<Button
								variant="contained"
								style={{
									backgroundColor: "rgba(255,0,0,0.4)",
									color: "white",
								}}
								className="go-next-button"
								onClick={() => handleNext()}
							>
								Tập tới
							</Button>
						) : (
							""
						)}
					</Grid>
				</Grid>

				{/* Middle Controls */}

				<Grid
					container
					direction="row"
					alignItems="center"
					justifyContent="center"
				>
					<IconButton
						onClick={onRewind}
						className={classes.controlIcons}
						aria-label="rewind"
					>
						<FastRewind />
					</IconButton>

					<IconButton
						onClick={onPlayPause}
						className={classes.controlIcons}
						aria-label="rewind"
					>
						{playing ? <Pause /> : <PlayArrow />}
					</IconButton>

					<IconButton
						onClick={onFastForward}
						className={classes.controlIcons}
						aria-label="rewind"
					>
						<FastForward />
					</IconButton>
				</Grid>

				{/* Bottom Controls */}

				<Grid
					container
					direction="row"
					justifyContent="space-between"
					alignItems="center"
				>
					<Grid item xs={12}>
						<PrettoSlider
							min={0}
							max={100}
							value={played * 100}
							// ValueLabelComponent={(props) => (
							// 	<ValueLabelComponent {...props} value={elapsedTime} />
							// )}
							valueLabelDisplay="off"
							onChange={onSeek}
							onMouseDown={onSeekMouseDown}
							onChangeCommitted={onSeekMouseUp}
						/>
					</Grid>

					<Grid item>
						<Grid container alignItems="center" direction="row">
							<IconButton onClick={onPlayPause} className={classes.bottomIcons}>
								{playing ? (
									<Pause fontSize="small" />
								) : (
									<PlayArrow fontSize="small" />
								)}
							</IconButton>

							<Button
								onClick={onChangeDisplayFormat}
								variant="text"
								style={{ color: "#fff", marginLeft: 16 }}
							>
								<Typography>
									{elapsedTime}/{totalDuration}
								</Typography>
							</Button>

							<IconButton onClick={onMute} className={classes.bottomIcons}>
								{muted ? (
									<VolumeOff fontSize="small" />
								) : (
									<VolumeUp fontSize="small" />
								)}
							</IconButton>

							<Slider
								min={0}
								max={100}
								value={volume * 100}
								className={classes.volumeSlider}
								onChange={onVolumeChange}
								onChangeCommitted={onVolumeSeekUp}
							/>
						</Grid>
					</Grid>
					<Grid item>
						<Button
							onClick={handlePopover}
							variant="text"
							className={classes.bottomIcons}
						>
							<Typography>{playbackRate}X</Typography>
						</Button>

						<Popover
							id={id}
							open={open}
							anchorEl={anchorEl}
							onClose={handleClose}
							anchorOrigin={{
								vertical: "top",
								horizontal: "center",
							}}
							transformOrigin={{
								vertical: "bottom",
								horizontal: "center",
							}}
						>
							<Grid container direction="column-reverse">
								{[0.5, 1, 1.5, 2].map((rate) => (
									<Button
										onClick={() => onPlaybackRateChange(rate)}
										variant="text"
										key={rate}
									>
										<Typography
											color={rate === playbackRate ? "secondary" : "primary"}
										>
											{rate}
										</Typography>
									</Button>
								))}
							</Grid>
						</Popover>

						<IconButton
							onClick={onToggleFullScreen}
							className={classes.bottomIcons}
						>
							<Fullscreen fontSize="small" />
						</IconButton>
					</Grid>
				</Grid>
			</div>
		)
	}
)
