<?php
/**
 * MBS Accessories - Centralized Shipping Configuration
 * Single source of truth for Leopard Courier delivery charges.
 * Any page that needs shipping must include this file.
 */

// --- Courier zones & charges (PKR) ---
define('SHIPPING_RWP_ISL', 150);       // Rawalpindi / Islamabad
define('SHIPPING_MAJOR_CITIES', 250);  // Major cities
define('SHIPPING_OTHER', 350);         // Other cities

// Rawalpindi / Islamabad zone (also auto-matched for "islamabad", "rawalpindi", "rwp/isb" etc.)
$RWP_ISL_CITIES = array(
    'rawalpindi', 'rwp', 'islamabad', 'isb', 'rwp/isb', 'islamabad/rawalpindi',
    'rawalpindi/islamabad', 'islamabad & rawalpindi', 'islamabad-rwp'
);

// Major cities covered by Leopard Courier at standard rate
$MAJOR_CITIES = array(
    'karachi', 'lahore', 'faisalabad', 'multan', 'hyderabad', 'peshawar',
    'quetta', 'sialkot', 'gujranwala', 'gujrat', 'sargodha', 'bahawalpur',
    'sahiwal', 'sukkur', 'abbottabad', 'mardan', 'swat', 'sawat', 'mirpur',
    'dera ghazi khan', 'dg khan', 'sadiqabad', 'rahim yar khan', 'jhelum',
    'okara', 'sheikhupura', 'kasur', 'chakwal', 'jhang', 'muzaffargarh',
    'khanewal', 'attock', 'burewala', 'wah', 'taxila', 'nawabshah', 'larkana',
    'kotli', 'bhimbher', 'kharian', 'hasan abdal', 'gujar khan', 'mangla',
    'vehari', 'mandi bahauddin', 'chichawatni', 'kundian', 'kallar kahar'
);

/**
 * Calculate Leopard Courier delivery charge for a given city.
 * Returns 150 (RWP/ISL), 250 (Major) or 350 (Other).
 */
function get_shipping_charge($city)
{
    global $RWP_ISL_CITIES, $MAJOR_CITIES;
    $city = strtolower(trim((string)$city));

    if ($city === '') {
        return SHIPPING_OTHER;
    }

    foreach ($RWP_ISL_CITIES as $c) {
        if (strpos($city, $c) !== false) {
            return SHIPPING_RWP_ISL;
        }
    }

    foreach ($MAJOR_CITIES as $c) {
        if (strpos($city, $c) !== false) {
            return SHIPPING_MAJOR_CITIES;
        }
    }

    return SHIPPING_OTHER;
}

/**
 * Build a JSON blob for the frontend so the live shipping preview
 * on the checkout page always matches the PHP logic above.
 */
function shipping_json()
{
    global $RWP_ISL_CITIES, $MAJOR_CITIES;
    return json_encode(array(
        'rwp_isl'      => $RWP_ISL_CITIES,
        'major'        => $MAJOR_CITIES,
        'rwp_charge'   => SHIPPING_RWP_ISL,
        'major_charge' => SHIPPING_MAJOR_CITIES,
        'other_charge' => SHIPPING_OTHER
    ));
}
?>
