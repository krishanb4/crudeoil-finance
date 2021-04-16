import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Chip from '@material-ui/core/Chip';
import imgApi from 'dan-api/images/photos';
import avatarApi from 'dan-api/images/avatars';
import PapperBlock from '../PapperBlock/PapperBlock';
import styles from './widget-jss';
import messageStyles from 'dan-styles/Messages.scss';
import ArrowDownward from '@material-ui/icons/ArrowDownward';

function createData(
  vault,
  subVault,
  address,
  tvl
) {
  return {
    vault,
    subVault,
    address,
    tvl
  };
}

const data = [
  createData(
    'CAKE',
    'Pancake (Auto) / AutoFarm',
    '0xe0B34671qc928QQ7823c0218A921B9231',
    '$0.00M'
  ),
  createData(
    'BIFI Maxi',
    'Beefy Finance / Beefy',
    '0xfe12760A08v972V08891V09271aw008a2',
    '$0.00M'
  ),
  createData(
    'WBNB',
    'Venus (Auto) / AutoFarm',
    '0xq2123s9070Aj892890P9092Bw725798M9',
    '$0.00M'
  ),
  createData(
    'CAKE',
    'Pancake (Auto) / AutoFarm',
    '0xe0B34671qc928QQ7823c0218A921B9231',
    '$0.00M'
  ),
  createData(
    'BUSD/USDT/USDC/DAI',
    'Belt / Belt',
    '0qa054a99A020KKI9282190a00289l0019A',
    '$0.00M'
  ),
];

function TableWidget(props) {
  const { classes } = props;
  const getStatus = status => {
    switch (status) {
      case 'Error':
        return messageStyles.bgError;
      case 'Warning':
        return messageStyles.bgWarning;
      case 'Info':
        return messageStyles.bgInfo;
      case 'Success':
        return messageStyles.bgSuccess;
      default:
        return messageStyles.bgDefault;
    }
  };
  const getProgress = status => {
    switch (status) {
      case 'Error':
        return progressStyles.bgError;
      case 'Warning':
        return progressStyles.bgWarning;
      case 'Info':
        return progressStyles.bgInfo;
      case 'Success':
        return progressStyles.bgSuccess;
      default:
        return progressStyles.bgDefault;
    }
  };
  return (
    <PapperBlock
      noMargin
      title="Vault Statistics"
      whiteBg
    >
      <div className={classes.root}>
        <Table className={classNames(classes.tableLong, classes.stripped)}>
          <TableHead className={classes.tableHeaderBg}>
            <TableRow>
              <TableCell padding="default"  className={classes.tableHeader}>Vault</TableCell>
              <TableCell  className={classes.tableHeader}>Address</TableCell>
              <TableCell className={classes.tableHeader}>TVL</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(n => [
              <TableRow key={n.vault}>
                <TableCell padding="default">
                  <div className={classes.flex}>
                    <div className={classes.flexCol}>
                      <Typography>{n.vault}</Typography>
                      <Typography>{n.subVault}</Typography>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className={classes.flex}>
                    <div>
                      <Typography>{n.address}</Typography>
                    </div>
                  </div>
                </TableCell>
                <TableCell align="right">
                  <div className={classes.flex}>
                    <div>
                      <Typography>{n.tvl}</Typography>
                    </div>
                  </div>
                </TableCell>
              </TableRow>,
            ])}
          </TableBody>
        </Table>
      </div>
    </PapperBlock>
  );
}

TableWidget.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TableWidget);
